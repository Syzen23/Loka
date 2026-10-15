import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { createServer as createViteServer } from 'vite';
import { execute, generateToken, getDb, hashPassword, queryAll, queryOne } from './src/server/db.js';
import { generateWebsiteWithGemini } from './src/server/aiGenerator.js';
import { PRESET_TEMPLATES } from './src/templates/presetTemplates.js';
import { BusinessInfoSchema } from './src/types/schema.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Auth Middleware
interface AuthenticatedRequest extends Request {
  userId?: string;
}

async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Harap login terlebih dahulu' });
    return;
  }

  const token = authHeader.substring(7);
  try {
    const session = await queryOne<{ user_id: string; expires_at: string }>(
      'SELECT user_id, expires_at FROM sessions WHERE token = ?',
      [token]
    );

    if (!session) {
      res.status(401).json({ error: 'Session tidak valid atau sudah kedaluwarsa' });
      return;
    }

    req.userId = session.user_id;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan autentikasi' });
  }
}

// ---------------------------------------------
// 1. AUTHENTICATION ROUTES
// ---------------------------------------------
app.post('/api/auth/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Nama, email, dan password wajib diisi' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password minimal 6 karakter' });
      return;
    }

    const existing = await queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing) {
      res.status(400).json({ error: 'Email sudah terdaftar. Silakan login.' });
      return;
    }

    const userId = `usr_${crypto.randomUUID()}`;
    const passwordHash = hashPassword(password);

    await execute(
      'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)',
      [userId, name.trim(), email.toLowerCase().trim(), passwordHash]
    );

    // Create session token
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
    await execute('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, userId, expiresAt]);

    res.json({
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
      },
    });
  } catch (err: any) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message || 'Gagal mendaftarkan akun' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email dan password wajib diisi' });
      return;
    }

    const user = await queryOne<{ id: string; name: string; email: string; password_hash: string }>(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (!user) {
      res.status(400).json({ error: 'Email atau password salah' });
      return;
    }

    const passwordHash = hashPassword(password);
    if (user.password_hash !== passwordHash) {
      res.status(400).json({ error: 'Email atau password salah' });
      return;
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await execute('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, user.id, expiresAt]);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Gagal login' });
  }
});

app.get('/api/auth/me', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await queryOne<{ id: string; name: string; email: string; created_at: string }>(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.userId]
    );
    if (!user) {
      res.status(404).json({ error: 'User tidak ditemukan' });
      return;
    }
    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/logout', async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    await execute('DELETE FROM sessions WHERE token = ?', [token]);
  }
  res.json({ success: true, message: 'Berhasil logout' });
});

// ---------------------------------------------
// 2. TEMPLATES
// ---------------------------------------------
app.get('/api/templates', (_req: Request, res: Response): void => {
  res.json({ templates: PRESET_TEMPLATES });
});

// ---------------------------------------------
// 3. AI GENERATION ROUTE
// ---------------------------------------------
app.post('/api/ai/generate-website', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const parseResult = BusinessInfoSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Data bisnis tidak valid',
        details: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const businessInfo = parseResult.data;
    const generatedData = await generateWebsiteWithGemini(businessInfo);

    res.json({
      success: true,
      data: generatedData,
    });
  } catch (err: any) {
    console.error('AI generation error:', err);
    res.status(500).json({ error: err.message || 'Gagal menghasilkan landing page dengan AI' });
  }
});

// ---------------------------------------------
// 4. WEBSITES CRUD
// ---------------------------------------------
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function getUniqueSlug(baseName: string, excludeWebsiteId?: string): Promise<string> {
  let baseSlug = slugify(baseName);
  if (!baseSlug) baseSlug = 'website';

  let currentSlug = baseSlug;
  let counter = 1;

  while (true) {
    let sql = 'SELECT id FROM websites WHERE slug = ?';
    const params: any[] = [currentSlug];
    if (excludeWebsiteId) {
      sql += ' AND id != ?';
      params.push(excludeWebsiteId);
    }
    const existing = await queryOne(sql, params);
    if (!existing) {
      return currentSlug;
    }
    counter++;
    currentSlug = `${baseSlug}-${counter}`;
  }
}

// List user's websites
app.get('/api/websites', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websites = await queryAll<{
      id: string;
      user_id: string;
      name: string;
      slug: string;
      status: string;
      template: string;
      business_info: string;
      theme: string;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT w.*, 
        (SELECT count(*) FROM sections s WHERE s.website_id = w.id) as section_count 
       FROM websites w 
       WHERE w.user_id = ? 
       ORDER BY w.updated_at DESC`,
      [req.userId]
    );

    const formatted = websites.map((w: any) => ({
      id: w.id,
      userId: w.user_id,
      name: w.name,
      slug: w.slug,
      status: w.status,
      template: w.template,
      businessInfo: JSON.parse(w.business_info || '{}'),
      theme: JSON.parse(w.theme || '{}'),
      sectionCount: w.section_count,
      createdAt: w.created_at,
      updatedAt: w.updated_at,
    }));

    res.json({ websites: formatted });
  } catch (err: any) {
    console.error('Fetch websites error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create website (From Template, AI data, or custom)
app.post('/api/websites', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, templateId, businessInfo, theme, sections } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Nama website wajib diisi' });
      return;
    }

    const websiteId = `site_${crypto.randomUUID()}`;
    const slug = await getUniqueSlug(name);

    let chosenBusinessInfo = businessInfo || {
      name,
      category: 'Bisnis Lokal',
      description: 'Landing page profesional untuk usaha lokal.',
      location: 'Indonesia',
      whatsapp: '6281234567890',
    };

    let chosenTheme = theme || {
      primaryColor: '#2563eb',
      secondaryColor: '#0f172a',
      font: 'sans',
    };

    let initialSections: Array<{ type: string; content: any }> = [];

    // If created from template
    if (templateId) {
      const template = PRESET_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        chosenBusinessInfo = template.businessInfo;
        chosenTheme = template.theme;
        initialSections = template.sections;
      }
    } else if (sections && Array.isArray(sections)) {
      initialSections = sections;
    }

    await execute(
      `INSERT INTO websites (id, user_id, name, slug, status, template, business_info, theme) 
       VALUES (?, ?, ?, ?, 'draft', ?, ?, ?)`,
      [
        websiteId,
        req.userId,
        name,
        slug,
        templateId || null,
        JSON.stringify(chosenBusinessInfo),
        JSON.stringify(chosenTheme),
      ]
    );

    // Insert sections with position
    for (let i = 0; i < initialSections.length; i++) {
      const s = initialSections[i];
      const sectionId = `sec_${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO sections (id, website_id, type, content, position) VALUES (?, ?, ?, ?, ?)`,
        [sectionId, websiteId, s.type, JSON.stringify(s.content), i]
      );
    }

    res.json({
      success: true,
      websiteId,
      slug,
    });
  } catch (err: any) {
    console.error('Create website error:', err);
    res.status(500).json({ error: err.message || 'Gagal membuat website' });
  }
});

// Get single website with sections
app.get('/api/websites/:id', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const website = await queryOne<{
      id: string;
      user_id: string;
      name: string;
      slug: string;
      status: string;
      template: string;
      business_info: string;
      theme: string;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM websites WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);

    if (!website) {
      res.status(404).json({ error: 'Website tidak ditemukan atau bukan milik Anda' });
      return;
    }

    const sections = await queryAll<{
      id: string;
      website_id: string;
      type: string;
      content: string;
      position: number;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM sections WHERE website_id = ? ORDER BY position ASC', [website.id]);

    const formattedSections = sections.map((s) => ({
      id: s.id,
      websiteId: s.website_id,
      type: s.type,
      position: s.position,
      content: JSON.parse(s.content || '{}'),
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    }));

    res.json({
      website: {
        id: website.id,
        userId: website.user_id,
        name: website.name,
        slug: website.slug,
        status: website.status,
        template: website.template,
        businessInfo: JSON.parse(website.business_info || '{}'),
        theme: JSON.parse(website.theme || '{}'),
        createdAt: website.created_at,
        updatedAt: website.updated_at,
        sections: formattedSections,
      },
    });
  } catch (err: any) {
    console.error('Get website error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update website metadata / theme / businessInfo / slug
app.put('/api/websites/:id', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, theme, businessInfo } = req.body;
    const websiteId = req.params.id;

    const existing = await queryOne('SELECT id FROM websites WHERE id = ? AND user_id = ?', [
      websiteId,
      req.userId,
    ]);

    if (!existing) {
      res.status(404).json({ error: 'Website tidak ditemukan' });
      return;
    }

    let finalSlug = slug;
    if (slug) {
      finalSlug = await getUniqueSlug(slug, websiteId);
    }

    await execute(
      `UPDATE websites 
       SET name = COALESCE(?, name),
           slug = COALESCE(?, slug),
           theme = COALESCE(?, theme),
           business_info = COALESCE(?, business_info),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [
        name || null,
        finalSlug || null,
        theme ? JSON.stringify(theme) : null,
        businessInfo ? JSON.stringify(businessInfo) : null,
        websiteId,
        req.userId,
      ]
    );

    res.json({ success: true, message: 'Website berhasil diperbarui', slug: finalSlug });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete website
app.delete('/api/websites/:id', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websiteId = req.params.id;
    await execute('DELETE FROM sections WHERE website_id = ?', [websiteId]);
    await execute('DELETE FROM websites WHERE id = ? AND user_id = ?', [websiteId, req.userId]);
    res.json({ success: true, message: 'Website berhasil dihapus' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Publish website
app.post('/api/websites/:id/publish', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websiteId = req.params.id;
    const website = await queryOne<{ slug: string }>(
      'SELECT slug FROM websites WHERE id = ? AND user_id = ?',
      [websiteId, req.userId]
    );

    if (!website) {
      res.status(404).json({ error: 'Website tidak ditemukan' });
      return;
    }

    await execute(
      "UPDATE websites SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [websiteId]
    );

    res.json({ success: true, status: 'published', slug: website.slug });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Unpublish website
app.post('/api/websites/:id/unpublish', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websiteId = req.params.id;
    await execute("UPDATE websites SET status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [
      websiteId,
      req.userId,
    ]);
    res.json({ success: true, status: 'draft' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// 5. SECTIONS CRUD & REORDERING
// ---------------------------------------------
app.post('/api/websites/:id/sections', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websiteId = req.params.id;
    const { type, content } = req.body;

    // Verify ownership
    const owner = await queryOne('SELECT id FROM websites WHERE id = ? AND user_id = ?', [
      websiteId,
      req.userId,
    ]);
    if (!owner) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    const countRow = await queryOne<{ count: number }>(
      'SELECT count(*) as count FROM sections WHERE website_id = ?',
      [websiteId]
    );
    const newPosition = countRow?.count ?? 0;
    const sectionId = `sec_${crypto.randomUUID()}`;

    await execute(
      'INSERT INTO sections (id, website_id, type, content, position) VALUES (?, ?, ?, ?, ?)',
      [sectionId, websiteId, type, JSON.stringify(content || {}), newPosition]
    );

    await execute('UPDATE websites SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [websiteId]);

    res.json({
      success: true,
      section: {
        id: sectionId,
        websiteId,
        type,
        content,
        position: newPosition,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/websites/:id/sections/:sectionId', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { websiteId, sectionId } = { websiteId: req.params.id, sectionId: req.params.sectionId };
    const { content } = req.body;

    const owner = await queryOne('SELECT id FROM websites WHERE id = ? AND user_id = ?', [
      websiteId,
      req.userId,
    ]);
    if (!owner) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    await execute(
      'UPDATE sections SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND website_id = ?',
      [JSON.stringify(content), sectionId, websiteId]
    );

    await execute('UPDATE websites SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [websiteId]);

    res.json({ success: true, message: 'Section berhasil diperbarui' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/websites/:id/sections/:sectionId', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { websiteId, sectionId } = { websiteId: req.params.id, sectionId: req.params.sectionId };

    const owner = await queryOne('SELECT id FROM websites WHERE id = ? AND user_id = ?', [
      websiteId,
      req.userId,
    ]);
    if (!owner) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    await execute('DELETE FROM sections WHERE id = ? AND website_id = ?', [sectionId, websiteId]);

    // Re-index remaining positions
    const remaining = await queryAll<{ id: string }>('SELECT id FROM sections WHERE website_id = ? ORDER BY position ASC', [websiteId]);
    for (let i = 0; i < remaining.length; i++) {
      await execute('UPDATE sections SET position = ? WHERE id = ?', [i, remaining[i].id]);
    }

    await execute('UPDATE websites SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [websiteId]);

    res.json({ success: true, message: 'Section berhasil dihapus' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Reorder sections
app.put('/api/websites/:id/sections/reorder', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const websiteId = req.params.id;
    const { sectionIds } = req.body as { sectionIds: string[] };

    if (!Array.isArray(sectionIds)) {
      res.status(400).json({ error: 'sectionIds harus berupa array string ID' });
      return;
    }

    const owner = await queryOne('SELECT id FROM websites WHERE id = ? AND user_id = ?', [
      websiteId,
      req.userId,
    ]);
    if (!owner) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    for (let i = 0; i < sectionIds.length; i++) {
      await execute('UPDATE sections SET position = ? WHERE id = ? AND website_id = ?', [
        i,
        sectionIds[i],
        websiteId,
      ]);
    }

    await execute('UPDATE websites SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [websiteId]);

    res.json({ success: true, message: 'Urutan section berhasil disimpan' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// 6. PUBLIC SITE ENDPOINT (NO AUTH)
// ---------------------------------------------
app.get('/api/public/sites/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug;
    const website = await queryOne<{
      id: string;
      name: string;
      slug: string;
      status: string;
      template: string;
      business_info: string;
      theme: string;
      created_at: string;
      updated_at: string;
    }>('SELECT * FROM websites WHERE slug = ?', [slug]);

    if (!website) {
      res.status(404).json({ error: 'Halaman landing page tidak ditemukan.' });
      return;
    }

    if (website.status !== 'published') {
      res.status(403).json({
        error: 'Website ini belum dipublikasikan oleh pemiliknya (Masih berstatus Draft).',
        isDraft: true,
      });
      return;
    }

    const sections = await queryAll<{
      id: string;
      website_id: string;
      type: string;
      content: string;
      position: number;
    }>('SELECT * FROM sections WHERE website_id = ? ORDER BY position ASC', [website.id]);

    res.json({
      website: {
        id: website.id,
        name: website.name,
        slug: website.slug,
        status: website.status,
        businessInfo: JSON.parse(website.business_info || '{}'),
        theme: JSON.parse(website.theme || '{}'),
        sections: sections.map((s) => ({
          id: s.id,
          type: s.type,
          position: s.position,
          content: JSON.parse(s.content || '{}'),
        })),
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// VITE SPA DEV & PROD INTEGRATION
// ---------------------------------------------
async function startServer() {
  await getDb(); // Initialize database tables

  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 LokalSite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
