import { useState } from 'react';
import './SecondaryNavPage.css';
import SecondaryNav, {
  type SecondaryNavSection,
} from '../../../patterns/SecondaryNav/SecondaryNav';
import Icon from '../../../components/Icon/Icon';

/* -- Demo data: Profiles Database context --------------------------------- */

const PROFILES_SECTIONS: SecondaryNavSection[] = [
  {
    id: 'profiles-db',
    title: 'Profiles database',
    items: [
      { id: 'all-profiles',  label: 'All profiles',  icon: 'grid-ultra',      count: 256 },
      { id: 'unsorted',      label: 'Unsorted',       icon: 'inbox-ultra',     count: 17 },
      { id: 'starred',       label: 'Starred',        icon: 'star-ultra',      count: 29 },
    ],
  },
  {
    id: 'collections',
    title: 'Collections',
    items: [
      { id: 'developers',   label: 'Developers',    icon: 'folder-ultra', count: 4 },
      { id: 'good-fit',     label: 'Good fit',      icon: 'folder-ultra' },
      { id: 'untitled-1',   label: 'Untitled',      icon: 'folder-ultra', count: 217 },
      { id: 'untitled-2',   label: 'Untitled',      icon: 'folder-ultra' },
      { id: 'data-analyst', label: 'Data analyst',   icon: 'folder-ultra', count: 5 },
    ],
  },
  {
    id: 'linkedin-mapping',
    title: 'LinkedIn Talent Mapping',
    items: [
      { id: 'linkedin-search', label: 'LinkedIn Search',              icon: 'search-ultra' },
      { id: 'hr-generalist',   label: 'HR Generalist, Jordan, Amma', icon: 'folder-ultra' },
      { id: 'qa-automation',   label: 'QA Automation, Jordan',       icon: 'folder-ultra' },
    ],
  },
];

/* -- Demo data: Hiring Pipelines context ---------------------------------- */

const HIRING_SECTIONS: SecondaryNavSection[] = [
  {
    id: 'profiles-db',
    title: 'Profiles database',
    items: [
      { id: 'all-profiles',  label: 'All profiles',  icon: 'grid-ultra',  count: 256 },
      { id: 'unsorted',      label: 'Unsorted',       icon: 'inbox-ultra', count: 17 },
      { id: 'starred',       label: 'Starred',        icon: 'star-ultra',  count: 29 },
    ],
  },
  {
    id: 'collections',
    title: 'Collections',
    items: [
      { id: 'developers',       label: 'Developers',                    icon: 'folder-ultra', count: 4 },
      { id: 'good-fit',         label: 'Good fit',                      icon: 'folder-ultra' },
      { id: 'untitled-1',       label: 'Untitled',                      icon: 'folder-ultra', count: 217 },
      { id: 'untitled-2',       label: 'Untitled',                      icon: 'folder-ultra' },
      { id: 'data-analyst',     label: 'Data analyst',                  icon: 'folder-ultra', count: 5 },
    ],
  },
  {
    id: 'linkedin-mapping',
    title: 'LinkedIn Talent Mapping',
    items: [
      { id: 'linkedin-search',  label: 'LinkedIn Search',              icon: 'search-ultra' },
      { id: 'hr-generalist',    label: 'HR Generalist, Jordan, Amma', icon: 'folder-ultra' },
      { id: 'qa-automation',    label: 'QA Automation, Jordan',       icon: 'folder-ultra' },
      { id: 'sr-sw-dev',        label: 'Senior Software Develop',     icon: 'folder-ultra' },
      { id: 'head-marketing',   label: 'Head of Marketing, EMEA',     icon: 'folder-ultra' },
      { id: 'jr-ui-designer',   label: 'Junior UI Designer',          icon: 'folder-ultra' },
    ],
  },
];

/* -- Page ----------------------------------------------------------------- */

export default function SecondaryNavPage() {
  const [activeProfiles, setActiveProfiles] = useState('all-profiles');
  const [activeHiring, setActiveHiring] = useState('linkedin-search');

  return (
    <div className="secondary-nav-page">
      <h1 className="page-title">Secondary Navigation Panel</h1>
      <p className="page-subtitle">
        Module navigation panel that sits next to the main sidebar.
        General structure is unified; tab sections change dynamically per module context.
        Header height matches the main nav bar for visual alignment.
      </p>

      <section className="variant-section">
        <h2 className="variant-section__title">Profiles Database</h2>
        <div className="secondary-nav-demo-row">
          <div className="secondary-nav-demo-col">
            <SecondaryNav
              headerIcon={<Icon name="pipelines-fill" />}
              headerLabel="Profiles Database"
              sections={PROFILES_SECTIONS}
              activeId={activeProfiles}
              onItemClick={(id) => setActiveProfiles(id)}
            />
          </div>
        </div>
      </section>

      <section className="variant-section">
        <h2 className="variant-section__title">Hiring Pipelines</h2>
        <div className="secondary-nav-demo-row">
          <div className="secondary-nav-demo-col">
            <SecondaryNav
              headerIcon={<Icon name="pipelines-fill" />}
              headerLabel="Hiring Pipelines"
              sections={HIRING_SECTIONS}
              activeId={activeHiring}
              onItemClick={(id) => setActiveHiring(id)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
