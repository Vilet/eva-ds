import { useState } from 'react';
import './MainSidebarPage.css';
import MainSidebar, {
  type SidebarNavGroup,
  type SidebarState,
} from '../../../patterns/MainSidebar/MainSidebar';

/* ── Demo nav data (matches Figma sidebar) ──────────────────────────────── */

const NAV_GROUPS: SidebarNavGroup[] = [
  {
    id: 'general',
    items: [
      { id: 'overview',    label: 'Overview',       icon: 'home2-ultra',        type: 'regular' },
      { id: 'eva-agent',   label: 'Eva agent',      icon: 'enfinity-logo',      type: 'regular' },
      { id: 'shared',      label: 'Shared with me', icon: 'folder-ultra',       type: 'regular' },
      { id: 'analytics',   label: 'Analytics',      icon: 'analytics-v2-fill',  type: 'regular' },
    ],
  },
  {
    id: 'products',
    items: [
      { id: 'hiring',      label: 'Hiring',           icon: 'pipelines-fill',    type: 'branded' },
      { id: 'assessments', label: 'Assessments',      icon: 'video-fill',        type: 'branded' },
      { id: 'linkedin',    label: 'LinkedIn Search',  icon: 'in-fil',            type: 'branded' },
      { id: 'onboarding',  label: 'Onboarding',       icon: 'onboarding2-fill',  type: 'branded' },
      { id: 'forms',       label: 'Forms',            icon: 'templates-fill',    type: 'branded' },
      { id: 'org-chart',   label: 'Org Chart',        icon: 'org-fill',          type: 'branded' },
      { id: 'branding',    label: 'Branding & Portal', icon: 'style-ultra',      type: 'branded' },
    ],
  },
  {
    id: 'tools',
    items: [
      { id: 'templates',   label: 'Templates',     icon: 'layers-ultra',      type: 'regular' },
      { id: 'import',      label: 'Import/Export',  icon: 'refresh-ultra',     type: 'regular' },
      { id: 'events',      label: 'Events Log',     icon: 'event-logs-ultra',  type: 'regular' },
    ],
  },
  {
    id: 'settings',
    items: [
      { id: 'branch-setup',  label: 'Branch setups',  icon: 'adjustment-ultra',  type: 'regular' },
      { id: 'account-setup', label: 'Account setups', icon: 'setting-ultra',     type: 'regular' },
    ],
  },
];

/* ── Demo company logo placeholder ──────────────────────────────────────── */

function CompanyLogo() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ed1b2c',
        borderRadius: 'var(--radius-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
      }}
    >
      E
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function MainSidebarPage() {
  const [activeId, setActiveId] = useState('hiring');

  const states: SidebarState[] = ['skeleton', 'minimized', 'open'];

  return (
    <div className="main-sidebar-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Main Sidebar</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Main navigation sidebar pattern with three states: skeleton, minimized (72px), and open (200px).
          Uses the nav-icon Tab variant. Regular section tabs have transparent icon boxes;
          branded product tabs have colored icon boxes.
        </p>
      </div>

      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">All states</h2>
        </div>
        <div className="sidebar-demo-row">
          {states.map((s) => (
            <div key={s} className="sidebar-demo-col">
              <span className="sidebar-demo-col__label">{s}</span>
              <MainSidebar
                state={s}
                groups={NAV_GROUPS}
                activeId={activeId}
                branchName="Branch-na."
                branchAvatar="CR"
                companyLogo={<CompanyLogo />}
                onToggle={() => {}}
                onItemClick={(id) => setActiveId(id)}
                onBranchClick={() => {}}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
