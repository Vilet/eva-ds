import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './playground/Sidebar';
import { ROUTES } from './playground/nav.config';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="playground-shell"
      data-sidebar-open={sidebarOpen ? 'true' : undefined}
    >
      <button
        className="playground-menu-btn"
        aria-label="Toggle navigation"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        <span className="playground-menu-btn__bar" />
        <span className="playground-menu-btn__bar" />
        <span className="playground-menu-btn__bar" />
      </button>

      {sidebarOpen && (
        <div
          className="playground-overlay"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar onNavigate={() => setSidebarOpen(false)} />

      <main className="playground-content">
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}
