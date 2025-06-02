import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocForm from './components/DocForm';
import { RefreshCw } from 'lucide-react';

function App() {
  const [, forceUpdate] = useState({});

  const handleClearForm = useCallback(() => {
    // @ts-ignore
    if (window.__clearDocForm) {
      // @ts-ignore
      window.__clearDocForm();
      forceUpdate({});
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
        <header className="bg-primary-100 shadow-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-display font-semibold text-primary-900">Declaration of Conformity</h1>
            <button
              type="button"
              onClick={handleClearForm}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-surface-tertiary border border-border-light rounded-md hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 shadow-button hover:shadow-button-hover transition-all duration-150"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Form
            </button>
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
            <Route path="/doc" element={<DocForm onClearForm={() => forceUpdate({})} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
