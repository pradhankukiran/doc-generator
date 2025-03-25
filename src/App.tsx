import React from 'react';
import DocForm from './components/DocForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">DoC Generator | Båstadgruppen AB</h1>
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-12 w-auto"
          />
        </div>
      </header>
      <main className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <DocForm />
      </main>
    </div>
  );
}

export default App;
