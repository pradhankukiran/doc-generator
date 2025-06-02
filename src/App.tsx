import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocForm from './components/DocForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
        <header className="bg-primary-100 shadow-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-display font-semibold text-primary-900">DoC Generator | Båstadgruppen AB</h1>
            <img
              src="/logo.png"
              alt="Company Logo"
              className="h-12 w-auto"
            />
          </div>
        </header>
        <main className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DocForm />} />
            <Route path="/doc" element={<DocForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
