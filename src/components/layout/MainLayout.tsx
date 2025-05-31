import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-background-light border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 Win-Win Syndicate. All rights reserved.</p>
          <p className="mt-1 text-xs">This is a simulation app. No real crypto transactions are processed.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;