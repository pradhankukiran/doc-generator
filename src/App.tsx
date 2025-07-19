import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import DocForm from './components/DocForm.tsx';
import { RefreshCw, ArrowLeft, Download } from 'lucide-react';
import { getTranslations } from './translations';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, forceUpdate] = useState({});
  const uiTranslations = getTranslations("en");

  const handleClearForm = useCallback(() => {
    // @ts-ignore
    if (window.__clearDocForm) {
      // @ts-ignore
      window.__clearDocForm();
      forceUpdate({});
    }
  }, []);

  const handleBackToForm = () => {
    navigate('/');
  };

  const handleDownload = () => {
    // @ts-ignore
    if (window.__downloadPDF) {
      // @ts-ignore
      window.__downloadPDF();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      {location.pathname === '/' && (
        <div className="top-banner">
          <a href="https://doc-bastadgruppen.vercel.app/" target="_blank" rel="noopener noreferrer">
            Try the new DoC generator here made by the same rockstar dev.
          </a>
        </div>
      )}
      <header className="bg-primary-100 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-semibold text-primary-900">Declaration of Conformity</h1>
          {location.pathname === '/preview' ? (
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={handleBackToForm}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-surface-tertiary border border-border-light rounded-md hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 shadow-button hover:shadow-button-hover transition-all duration-150"
              >
                <ArrowLeft className="w-4 h-4" />
                {uiTranslations.backToFormButton}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 shadow-button hover:shadow-button-hover transition-all duration-150"
              >
                <Download className="w-4 h-4" />
                {uiTranslations.downloadPdfButton}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClearForm}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-surface-tertiary border border-border-light rounded-md hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 shadow-button hover:shadow-button-hover transition-all duration-150"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Form
            </button>
          )}
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-12 w-auto"
          />
        </div>
      </header>
      <main className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<DocForm onClearForm={() => forceUpdate({})} />} />
          <Route path="/preview" element={<DocForm />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
