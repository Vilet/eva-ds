import { useState, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { ROUTES, NAV_CONFIG, type NavItem } from './playground/nav.config';
import MainSidebar from '../patterns/MainSidebar/MainSidebar';
import type { SidebarNavGroup } from '../patterns/MainSidebar/MainSidebar';
import SecondaryNav from '../patterns/SecondaryNav/SecondaryNav';
import type { SecondaryNavSection } from '../patterns/SecondaryNav/SecondaryNav';
import MainAppbar from '../patterns/MainAppbar/MainAppbar';
import type { BreadcrumbItem } from '../patterns/MainAppbar/MainAppbar';
import Icon from '../components/Icon/Icon';

/* ── Main sidebar tabs (minimized panel) ─────────────────────────────────── */

const MAIN_SIDEBAR_GROUPS: SidebarNavGroup[] = [
  {
    id: 'main',
    items: [
      { id: 'ds', label: 'DS', icon: 'layers-ultra', type: 'branded' },
      { id: 'workflow', label: 'Workflow explanation', icon: 'book-open-ultra', type: 'regular' },
      { id: 'live-app', label: 'Live app demo', icon: 'globe-ultra', type: 'regular' },
    ],
  },
];

/* ── Convert NAV_CONFIG into SecondaryNav sections ───────────────────────── */

function buildSecondaryNavSections(): SecondaryNavSection[] {
  const sections: SecondaryNavSection[] = [];
  for (const group of NAV_CONFIG) {
    if (group.children?.length) {
      sections.push({
        id: group.id,
        title: '',
        items: [
          {
            id: group.id,
            label: group.label,
            hasChildren: true,
            children: group.children.map((child) => ({
              id: child.id,
              label: child.label,
            })),
          },
        ],
      });
    }
  }
  return sections;
}

const SECONDARY_NAV_SECTIONS = buildSecondaryNavSections();

/* ── Find the active child item from the current path ────────────────────── */

function findActiveItem(path: string, items: NavItem[]): { item?: NavItem; parent?: NavItem } {
  for (const item of items) {
    if (item.path === path) return { item };
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return { item: child, parent: item };
      }
    }
  }
  return {};
}

/* ── Build breadcrumbs from current route ────────────────────────────────── */

function buildBreadcrumbs(path: string): BreadcrumbItem[] {
  const { item, parent } = findActiveItem(path, NAV_CONFIG);
  const crumbs: BreadcrumbItem[] = [];
  if (parent) crumbs.push({ label: parent.label });
  if (item) crumbs.push({ label: item.label });
  if (crumbs.length === 0) crumbs.push({ label: 'Overview' });
  return crumbs;
}

/* ── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Find the currently active nav child id from the URL
  const activeNavId = useMemo(() => {
    const { item } = findActiveItem(location.pathname, NAV_CONFIG);
    return item?.id;
  }, [location.pathname]);

  // Track which sections are expanded in the secondary nav
  const [openSectionIds, setOpenSectionIds] = useState<Set<string>>(() => {
    // Expand sections that contain children (top-level groups)
    const ids = new Set<string>();
    for (const item of NAV_CONFIG) {
      if (item.children?.length) ids.add(item.id);
    }
    return ids;
  });

  const handleSecondaryNavItemClick = useCallback(
    (id: string) => {
      // Find the NavItem by id and navigate to its path
      for (const group of NAV_CONFIG) {
        if (group.id === id && group.path) {
          navigate(group.path);
          return;
        }
        if (group.children) {
          for (const child of group.children) {
            if (child.id === id && child.path) {
              navigate(child.path);
              return;
            }
          }
        }
      }
    },
    [navigate],
  );

  const handleSecondaryNavToggle = useCallback((id: string) => {
    setOpenSectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const breadcrumbs = useMemo(() => buildBreadcrumbs(location.pathname), [location.pathname]);

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

      {/* Minimized main sidebar with tooltips */}
      <MainSidebar
        state="minimized"
        groups={MAIN_SIDEBAR_GROUPS}
        activeId="ds"
        branchAvatar={
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M0 13.9755H11.5283V11.4785H0V13.9755Z" fill="#1C1D21" />
            <path d="M11.5283 8.23632V5.73925H0V8.23632H11.5283Z" fill="#1C1D21" />
            <path d="M0 2.49707H11.5283V0H0V2.49707Z" fill="#1C1D21" />
          </svg>
        }
      />

      {/* Secondary navigation using our SecondaryNav pattern */}
      <SecondaryNav
        headerIcon={<Icon name="layers-ultra" />}
        headerLabel="Elevatus DS playground"
        sections={SECONDARY_NAV_SECTIONS}
        activeId={activeNavId}
        openIds={openSectionIds}
        onItemClick={handleSecondaryNavItemClick}
        onToggle={handleSecondaryNavToggle}
      />

      {/* Content area with appbar + routed page */}
      <div className="playground-content-wrapper">
        <MainAppbar breadcrumbs={breadcrumbs} />
        <main className="playground-content">
          <Routes>
            {ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
