import { useState } from 'react';
import './LinkedInSearchPage.css';
import MainSidebar, {
  type SidebarNavGroup,
} from '../../../patterns/MainSidebar/MainSidebar';
import SecondaryNav, {
  type SecondaryNavSection,
} from '../../../patterns/SecondaryNav/SecondaryNav';
import MainAppbar, {
  AppbarAction,
} from '../../../patterns/MainAppbar/MainAppbar';
import ContentToolbar from '../../../patterns/ContentToolbar/ContentToolbar';
import ListRecord from '../../../patterns/ListRecord/ListRecord';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import HeroInlineSearch from '../../../patterns/HeroInlineSearch/HeroInlineSearch';

/* ── Sidebar nav data ────────────────────────────────────────────────────── */

const NAV_GROUPS: SidebarNavGroup[] = [
  {
    id: 'general',
    items: [
      { id: 'overview',   label: 'Overview',   icon: 'home2-ultra',       type: 'regular' },
      { id: 'eva-agent',  label: 'Eva agent', icon: 'enfinity-logo',     type: 'regular' },
      { id: 'search',     label: 'Search',    icon: 'search-ultra',      type: 'regular' },
      { id: 'analytics',  label: 'Analytics', icon: 'activity-ultra', type: 'regular' },
    ],
  },
  {
    id: 'products',
    items: [
      { id: 'hiring',      label: 'Hiring',           icon: 'pipelines-fill',   type: 'branded' },
      { id: 'assessments', label: 'Assessments',      icon: 'video-fill',       type: 'branded' },
      { id: 'linkedin',    label: 'LinkedIn Search',  icon: 'in-fil',           type: 'branded' },
      { id: 'onboarding',  label: 'Onboarding',       icon: 'onboarding2-fill', type: 'branded' },
      { id: 'forms',       label: 'Forms',            icon: 'templates-fill',   type: 'branded' },
      { id: 'org-chart',   label: 'Org Chart',        icon: 'org-fill',         type: 'branded' },
      { id: 'branding',    label: 'Branding & Portal', icon: 'style-ultra',     type: 'branded' },
    ],
  },
  {
    id: 'tools',
    items: [
      { id: 'templates', label: 'Templates',    icon: 'layers-ultra',     type: 'regular' },
      { id: 'import',    label: 'Import/Export', icon: 'refresh-ultra',    type: 'regular' },
      { id: 'events',    label: 'Events Log',    icon: 'event-logs-ultra', type: 'regular' },
    ],
  },
  {
    id: 'settings',
    items: [
      { id: 'branch-setup',  label: 'Branch setups',  icon: 'adjustment-ultra', type: 'regular' },
      { id: 'account-setup', label: 'Account setups', icon: 'setting-ultra',    type: 'regular' },
    ],
  },
];

/* ── Secondary nav data ──────────────────────────────────────────────────── */

const SECONDARY_SECTIONS: SecondaryNavSection[] = [
  {
    id: 'profiles-db',
    title: 'Profiles database',
    items: [
      { id: 'all-profiles', label: 'All profiles', icon: 'grid-ultra',  count: 256 },
      { id: 'unsorted',     label: 'Unsorted',      icon: 'inbox-ultra', count: 17 },
      { id: 'starred',      label: 'Starred',        icon: 'star-ultra',  count: 29 },
    ],
  },
  {
    id: 'collections',
    title: 'Collections',
    items: [
      { id: 'developers',   label: 'Developers',   icon: 'folder-ultra', count: 4 },
      { id: 'good-fit',     label: 'Good fit',     icon: 'folder-ultra' },
      { id: 'untitled-1',   label: 'Untitled',     icon: 'folder-ultra', count: 217 },
      { id: 'untitled-2',   label: 'Untitled',     icon: 'folder-ultra' },
      { id: 'data-analyst', label: 'Data analyst', icon: 'folder-ultra', count: 5 },
    ],
  },
  {
    id: 'linkedin-mapping',
    title: 'LinkedIn Talent Mapping',
    items: [
      { id: 'linkedin-search', label: 'LinkedIn Search',              icon: 'browse-ultra' },
      { id: 'hr-generalist',   label: 'HR Generalist, Jordan, Amma', icon: 'folder-ultra' },
      { id: 'qa-automation',   label: 'QA Automation, Jordan',       icon: 'folder-ultra' },
      { id: 'sr-sw-dev',       label: 'Senior Software Develop',     icon: 'folder-ultra' },
      { id: 'head-marketing',  label: 'Head of Marketing, EMEA',     icon: 'folder-ultra' },
      { id: 'jr-ui-designer',  label: 'Junior UI Designer',          icon: 'folder-ultra' },
    ],
  },
];

/* ── Filter chips data ───────────────────────────────────────────────────── */

const FILTER_CHIPS = [
  'IT Administrator, Amman',
  'Head of Customer Success, Amman',
  'React Developer, UI Developer',
];

/* ── Demo avatar URLs ────────────────────────────────────────────────────── */

const AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
];

/* ── Project list data ───────────────────────────────────────────────────── */

interface ProjectRow {
  id: string;
  title: string;
  syncText: string;
  frequency?: string;
  owner: string;
  profileCount: number;
  avatarCount: number;
}

const PROJECTS: ProjectRow[] = [
  { id: '1', title: 'HR Generalist, Jordan, Amman',       syncText: 'Last synced on 11 Mar, 17:14', frequency: 'Every 2 days', owner: 'Gustavo Nicolas',    profileCount: 12,  avatarCount: 8 },
  { id: '2', title: 'QA Automation, Jordan',               syncText: 'Last synced on 11 Mar, 17:14', owner: 'Winifred Wilkinson', profileCount: 34,  avatarCount: 2 },
  { id: '3', title: 'Senior Software Developer, Urgent',   syncText: 'Last synced on 11 Mar, 17:14', frequency: 'Every 1 hour',  owner: 'Sheldon Cormier',   profileCount: 89,  avatarCount: 2 },
  { id: '4', title: 'Head of Marketing, EMEA',             syncText: 'Last synced on 11 Mar, 17:14', frequency: 'Weekly',        owner: 'Sheila Walsh',      profileCount: 19,  avatarCount: 8 },
  { id: '5', title: 'Junior UI Designer',                  syncText: 'Last synced on 11 Mar, 17:14', owner: 'Dominic Rippin',    profileCount: 27,  avatarCount: 2 },
  { id: '6', title: 'SMM Specialist',                      syncText: 'Last synced on 11 Mar, 17:14', owner: 'Daniel Kub',        profileCount: 2,   avatarCount: 11 },
  { id: '7', title: 'IT Operations, CTO',                  syncText: 'Last synced on 11 Mar, 17:14', owner: 'Merle Yundt',       profileCount: 912, avatarCount: 8 },
  { id: '8', title: 'HR Generalist, Jordan, Amman',        syncText: 'Last synced on 11 Mar, 17:14', owner: 'John Heidenreich',  profileCount: 12,  avatarCount: 7 },
  { id: '9', title: 'Senior Software Developer, Urgent',   syncText: 'Last synced on 11 Mar, 17:14', owner: 'Loren Mueller',     profileCount: 34,  avatarCount: 2 },
  { id: '10', title: 'QA Automation, Jordan',              syncText: 'Last synced on 11 Mar, 17:14', owner: 'Penny Torp III',    profileCount: 12,  avatarCount: 8 },
  { id: '11', title: 'Product Manager, Dubai',             syncText: 'Last synced on 10 Mar, 09:30', frequency: 'Daily',         owner: 'Sarah Al-Rashid',   profileCount: 45,  avatarCount: 5 },
  { id: '12', title: 'DevOps Engineer, Remote',            syncText: 'Last synced on 10 Mar, 14:22', owner: 'Marcus Chen',       profileCount: 67,  avatarCount: 3 },
  { id: '13', title: 'Data Scientist, Riyadh',             syncText: 'Last synced on 09 Mar, 11:05', frequency: 'Every 3 days',  owner: 'Fatima Kazemi',     profileCount: 23,  avatarCount: 6 },
  { id: '14', title: 'UX Researcher, Beirut',              syncText: 'Last synced on 09 Mar, 16:48', owner: 'Nadia Haddad',      profileCount: 18,  avatarCount: 4 },
];

/* ── Inline sub-components (to be replaced with real components later) ──── */

function LinkedInIcon() {
  return (
    <div className="lsp-icon-32">
      <Icon name="in-fil" />
    </div>
  );
}

function SearchSection({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="lsp-search-section">
      <HeroInlineSearch value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="lsp-chips">
        {FILTER_CHIPS.map((chip) => (
          <span key={chip} className="lsp-chip">
            {chip}
            <button type="button" className="lsp-chip__remove" aria-label={`Remove ${chip}`}>
              <Icon name="plus-ultra" />
            </button>
          </span>
        ))}
        <Button
          variant="ghost"
          size="xs"
          iconLeft={<Icon name="more-horizontal" />}
          ariaLabel="More filters"
        />
      </div>
    </div>
  );
}

function AvatarStack({ count }: { count: number }) {
  const visible = AVATARS.slice(0, Math.min(3, count));
  return (
    <span className="lsp-avatar-stack">
      {visible.map((src, i) => (
        <img key={i} className="lsp-avatar-stack__img" src={src} alt="" />
      ))}
    </span>
  );
}

function RecordCounter({ count }: { count: number }) {
  return <span className="lsp-meta">Saved projects &middot; {count}</span>;
}

function ToolbarActions() {
  return (
    <>
      <Button variant="ghost" size="xs" label="Filter &middot; 2" />
      <Button variant="ghost" size="xs" label="Sort" />
      <Button variant="ghost" size="xs" label="Bulk select" />
    </>
  );
}

function ActionButtons() {
  return (
    <>
      <Button
        variant="wrapped"
        size="xs"
        iconLeft={<Icon name="arrow-up-right-ultra" />}
        ariaLabel="Open"
      />
      <Button
        variant="wrapped"
        size="xs"
        iconLeft={<Icon name="more-horizontal" />}
        ariaLabel="More options"
      />
    </>
  );
}

function ProjectRecord({ project }: { project: ProjectRow }) {
  return (
    <ListRecord
      leadingIcon={<LinkedInIcon />}
      title={project.title}
      actions={<ActionButtons />}
    >
      <span className="lsp-meta">{project.syncText}</span>
      {project.frequency && (
        <span className="lsp-meta">
          <Icon name="refresh-ultra" /> {project.frequency}
        </span>
      )}
      <span className="lsp-meta lsp-meta--dark">{project.owner}</span>
      <span className="lsp-badge">{project.profileCount} profiles</span>
      <AvatarStack count={project.avatarCount} />
      <span className="lsp-meta">{project.avatarCount}</span>
    </ListRecord>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function LinkedInSearchPage() {
  const [sidebarActiveId, setSidebarActiveId] = useState('linkedin');
  const [secondaryActiveId, setSecondaryActiveId] = useState('linkedin-search');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = searchQuery
    ? PROJECTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : PROJECTS;

  return (
    <div className="linkedin-search-page">
      {/* Main sidebar — minimized */}
      <div className="linkedin-search-page__sidebar">
        <MainSidebar
          state="minimized"
          groups={NAV_GROUPS}
          activeId={sidebarActiveId}
          branchName="Branch-na."
          branchAvatar="CR"
          onItemClick={(id) => setSidebarActiveId(id)}
        />
      </div>

      {/* Secondary nav */}
      <div className="linkedin-search-page__secondary-nav">
        <SecondaryNav
          headerIcon={<Icon name="pipelines-fill" />}
          headerLabel="Hiring Pipelines"
          sections={SECONDARY_SECTIONS}
          activeId={secondaryActiveId}
          onItemClick={(id) => setSecondaryActiveId(id)}
        />
      </div>

      {/* Main content */}
      <div className="linkedin-search-page__main">
        <MainAppbar
          breadcrumbs={[{ label: 'Profiles Database' }, { label: 'LinkedIn Search' }]}
        >
          <AppbarAction
            icon={<Icon name="inbox-ultra" />}
            hasIndicator
            ariaLabel="Inbox"
          />
          <AppbarAction
            icon={<Icon name="tasks1-ultra" />}
            ariaLabel="Tasks"
          />
          <AppbarAction
            icon={<Icon name="clock-ultra" />}
            ariaLabel="Activity"
          />
          <AppbarAction
            icon={
              <img
                className="appbar-profile-img"
                src="https://i.pravatar.cc/40?img=5"
                alt=""
              />
            }
            ariaLabel="Profile"
          />
        </MainAppbar>

        <div className="linkedin-search-page__body">
          <div className="linkedin-search-page__content">
            <SearchSection value={searchQuery} onChange={setSearchQuery} />

            <ContentToolbar left={<RecordCounter count={filteredProjects.length} />}>
              <ToolbarActions />
            </ContentToolbar>

            <div className="lsp-list">
              {filteredProjects.map((project) => (
                <ProjectRecord key={project.id} project={project} />
              ))}

              <button type="button" className="lsp-create-link">
                <Icon name="plus-ultra" />
                Create new project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
