import initSqlJs, { Database } from 'sql.js';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { PRESET_TEMPLATES } from '../templates/presetTemplates.js';

let dbInstance: Database | null = null;
const DB_PATH = path.resolve(process.cwd(), 'data', 'saas.sqlite');

export function hashPassword(password: string): string {
  const salt = 'lokalsite_salt_2026';
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();
  let db: Database;

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
    } catch (e) {
      console.warn('Could not read existing sqlite file, initializing fresh db:', e);
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS websites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      template TEXT,
      business_info TEXT NOT NULL,
      theme TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sections (
      id TEXT PRIMARY KEY,
      website_id TEXT NOT NULL,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Seed demo user if no users exist
  const stmt = db.prepare('SELECT count(*) as count FROM users');
  stmt.step();
  const countRow = stmt.getAsObject() as { count: number };
  stmt.free();

  if (countRow.count === 0) {
    const demoUserId = 'usr_demo_12345';
    const demoHash = hashPassword('password123');
    db.run(
      `INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)`,
      [demoUserId, 'Sajid - Pemilik Usaha', 'demo@lokalsite.id', demoHash]
    );
    console.log('Seeded initial demo user: demo@lokalsite.id / password123');
  }

  // Seed sample published website if none exist
  const siteStmt = db.prepare('SELECT count(*) as count FROM websites');
  siteStmt.step();
  const siteCountRow = siteStmt.getAsObject() as { count: number };
  siteStmt.free();

  if (siteCountRow.count === 0) {
    const starterTpl = PRESET_TEMPLATES[0]; // Kopi Senja
    const websiteId = 'site_kopi_senja_demo';
    const demoUserId = 'usr_demo_12345';

    db.run(
      `INSERT INTO websites (id, user_id, name, slug, status, template, business_info, theme)
       VALUES (?, ?, ?, ?, 'published', ?, ?, ?)`,
      [
        websiteId,
        demoUserId,
        starterTpl.name,
        'kopi-senja',
        starterTpl.id,
        JSON.stringify(starterTpl.businessInfo),
        JSON.stringify(starterTpl.theme),
      ]
    );

    for (let i = 0; i < starterTpl.sections.length; i++) {
      const s = starterTpl.sections[i];
      const sectionId = `sec_kopi_${i + 1}`;
      db.run(
        `INSERT INTO sections (id, website_id, type, content, position) VALUES (?, ?, ?, ?, ?)`,
        [sectionId, websiteId, s.type, JSON.stringify(s.content), i]
      );
    }
    console.log('Seeded starter website: Kopi Senja (/sites/kopi-senja)');
  }

  dbInstance = db;
  saveDb();
  return dbInstance;
}

export function saveDb(): void {
  if (!dbInstance) return;
  try {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, buffer);
  } catch (err) {
    console.error('Failed to save SQLite to disk:', err);
  }
}

// Relational query helper functions
export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = await getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows: T[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as unknown as T);
  }
  stmt.free();
  return rows;
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await queryAll<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function execute(sql: string, params: any[] = []): Promise<void> {
  const db = await getDb();
  db.run(sql, params);
  saveDb();
}
