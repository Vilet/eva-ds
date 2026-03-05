import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { NAV_CONFIG, type NavItem } from './nav.config';

interface SidebarProps {
  onNavigate: () => void;
}

function SidebarItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  if (item.path && !hasChildren) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive ? 'sidebar-link sidebar-link--active' : 'sidebar-link'
        }
        onClick={onNavigate}
        end={item.path === '/'}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="sidebar-section">
      <button
        className="sidebar-section__header"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>{item.label}</span>
        <span className={`sidebar-section__chevron${expanded ? ' sidebar-section__chevron--open' : ''}`}>
          ›
        </span>
      </button>

      {expanded && hasChildren && (
        <ul className="sidebar-section__list" role="list">
          {item.children!.map((child) => (
            <li key={child.id}>
              <SidebarItem item={child} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}

      {expanded && !hasChildren && (
        <p className="sidebar-section__empty">No items yet</p>
      )}
    </div>
  );
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Design system navigation">
      <div className="sidebar__brand">
        <span className="sidebar__brand-name">Elevatus DS</span>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list" role="list">
          {NAV_CONFIG.map((item) => (
            <li key={item.id}>
              <SidebarItem item={item} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
