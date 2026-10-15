import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EditorPage } from './pages/EditorPage';
import { PublicSitePage } from './pages/PublicSitePage';

function MainApp() {
  const { user, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [editingWebsiteId, setEditingWebsiteId] = useState<string | null>(null);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if public site URL: /sites/:slug
  const siteMatch = currentPath.match(/^\/sites\/([a-zA-Z0-9_-]+)/);
  if (siteMatch) {
    const slug = siteMatch[1];
    return <PublicSitePage slug={slug} />;
  }

  // Auth Loading Spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Memeriksa sesi pengguna...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, show Auth Page
  if (!user) {
    return <AuthPage />;
  }

  // If user is editing a website
  if (editingWebsiteId) {
    return (
      <EditorPage
        websiteId={editingWebsiteId}
        onBackToDashboard={() => setEditingWebsiteId(null)}
      />
    );
  }

  // Otherwise, show SaaS Dashboard
  return (
    <DashboardPage
      onOpenEditor={(websiteId) => setEditingWebsiteId(websiteId)}
      onOpenPublicSite={(slug) => {
        window.history.pushState({}, '', `/sites/${slug}`);
        setCurrentPath(`/sites/${slug}`);
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
