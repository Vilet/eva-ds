import { useState } from 'react';
import MainSidebar, {
  type SidebarNavGroup,
} from '../../../patterns/MainSidebar/MainSidebar';
import SecondaryNav, {
  type SecondaryNavSection,
} from '../../../patterns/SecondaryNav/SecondaryNav';
import MainAppbar from '../../../patterns/MainAppbar/MainAppbar';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';

/* ── Sidebar data ───────────────────────────────────────────────────────── */

const NAV_GROUPS: SidebarNavGroup[] = [
  {
    id: 'general',
    items: [
      { id: 'overview', label: 'Overview', icon: 'home2-ultra', type: 'regular' },
      { id: 'eva-agent', label: 'Eva agent', icon: 'enfinity-logo', type: 'regular' },
      { id: 'search', label: 'Search', icon: 'search-ultra', type: 'regular' },
      { id: 'analytics', label: 'Analytics', icon: 'analytics-v2-fill', type: 'regular' },
    ],
  },
  {
    id: 'products',
    items: [
      { id: 'hiring', label: 'Hiring', icon: 'pipelines-fill', type: 'branded' },
      { id: 'assessments', label: 'Assessments', icon: 'video-fill', type: 'branded' },
      { id: 'linkedin', label: 'LinkedIn Search', icon: 'in-fil', type: 'branded' },
      { id: 'onboarding', label: 'Onboarding', icon: 'onboarding2-fill', type: 'branded' },
      { id: 'forms', label: 'Forms', icon: 'templates-fill', type: 'branded' },
      { id: 'org-chart', label: 'Org Chart', icon: 'org-fill', type: 'branded' },
      { id: 'branding', label: 'Branding & Portal', icon: 'style-ultra', type: 'branded' },
    ],
  },
  {
    id: 'tools',
    items: [
      { id: 'templates', label: 'Templates', icon: 'layers-ultra', type: 'regular' },
      { id: 'import', label: 'Import/Export', icon: 'refresh-ultra', type: 'regular' },
      { id: 'events', label: 'Events Log', icon: 'event-logs-ultra', type: 'regular' },
    ],
  },
  {
    id: 'settings',
    items: [
      { id: 'branch-setup', label: 'Branch setups', icon: 'adjustment-ultra', type: 'regular' },
      { id: 'account-setup', label: 'Account setups', icon: 'setting-ultra', type: 'regular' },
    ],
  },
];

/* ── Secondary nav data (mailbox) ───────────────────────────────────────── */

const MAILBOX_SECTIONS: SecondaryNavSection[] = [
  {
    id: 'accounts',
    title: 'Accounts',
    items: [
      { id: 'smart-mailbox', label: 'Smart mailbox', icon: 'inbox-ultra', count: 12 },
    ],
  },
  {
    id: 'viletdesign',
    title: 'viletdesign@gmail.com',
    items: [
      { id: 'inbox', label: 'Inbox', icon: 'mail-ultra', count: 127 },
      { id: 'sent', label: 'Sent', icon: 'send-ultra' },
      { id: 'drafts', label: 'Drafts', icon: 'file-ultra' },
      { id: 'important', label: 'Important', icon: 'alert-circle-ultra', count: 4 },
      { id: 'starred', label: 'Starred', icon: 'star-ultra' },
      { id: 'spam', label: 'Spam', icon: 'alert-triangle-ultra' },
      { id: 'trash', label: 'Trash', icon: 'trash-ultra' },
    ],
  },
  {
    id: 'elevatus',
    title: 'violettan@elevatus.io',
    items: [
      { id: 'elev-inbox', label: 'Inbox', icon: 'mail-ultra', count: 147 },
      { id: 'calendar', label: 'Calendar', icon: 'calendar-ultra' },
    ],
  },
];

/* ── Fake inbox data ────────────────────────────────────────────────────── */

interface InboxItem {
  id: string;
  sender: string;
  subject: string;
  preview: string;
}

const INBOX_ITEMS: InboxItem[] = [
  {
    id: '1',
    sender: 'Guillermo Schoen',
    subject: 'The Company shall employ the',
    preview: 'title (the "Position"). The Emplo employment with...',
  },
  {
    id: '2',
    sender: 'Juanita Cremin',
    subject: 'The Company shall employ the',
    preview: 'title (the "Position"). The Emplo employment with...',
  },
  {
    id: '3',
    sender: 'Tim Boyle',
    subject: 'Subject title',
    preview: 'Preview of the email content that is truncated...',
  },
  {
    id: '4',
    sender: 'Marina Kovacs',
    subject: 'Q1 Performance Review',
    preview: 'Please find attached the quarterly review summary...',
  },
];

/* ── Duotone mailbox icon ───────────────────────────────────────────────── */

function MailboxDuotoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M4.36126 1.45825C3.31013 1.45825 2.37326 2.1211 2.02343 3.1123L0.870585 6.37869C0.777041 6.64373 0.729248 6.92275 0.729248 7.20381V10.0624C0.729248 11.4316 1.83921 12.5416 3.20841 12.5416H10.7917C12.161 12.5416 13.2709 11.4316 13.2709 10.0624V7.20381C13.2709 6.92275 13.2231 6.64373 13.1296 6.37869L11.9767 3.1123C11.6269 2.1211 10.69 1.45825 9.63891 1.45825H4.36126Z" fill="var(--primitives-secondary-secondary-dark-40)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.2709 7.61023C13.2709 6.86748 12.5861 6.31383 11.8598 6.46946L9.31162 7.0155C8.7688 7.13182 8.30828 7.48857 8.06002 7.98511L7.87508 8.35498C7.70937 8.6864 7.37063 8.89576 7.00008 8.89576C6.62954 8.89576 6.29079 8.6864 6.12508 8.35498L5.94015 7.98511C5.69188 7.48857 5.23137 7.13182 4.68855 7.0155L2.14037 6.46946C1.4141 6.31383 0.729248 6.86748 0.729248 7.61023V10.0624C0.729248 11.4316 1.83921 12.5416 3.20841 12.5416H10.7917C12.161 12.5416 13.2709 11.4316 13.2709 10.0624V7.61023Z" fill="var(--primitives-secondary-secondary-dark-40)" />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function MailboxPreview() {
  const [sidebarActiveId, setSidebarActiveId] = useState('overview');
  const [mailboxActiveId, setMailboxActiveId] = useState('inbox');

  return (
    <div className="mailbox-preview">
      {/* Main sidebar — minimized */}
      <div className="mailbox-preview__sidebar">
        <MainSidebar
          state="minimized"
          groups={NAV_GROUPS}
          activeId={sidebarActiveId}
          branchName="CR"
          branchAvatar="CR"
          onItemClick={(id) => setSidebarActiveId(id)}
        />
      </div>

      {/* Secondary nav — mailbox folders */}
      <div className="mailbox-preview__secondary-nav">
        <SecondaryNav
          headerIcon={<MailboxDuotoneIcon />}
          headerLabel="Mailbox & Calendar"
          sections={MAILBOX_SECTIONS}
          activeId={mailboxActiveId}
          onItemClick={(id) => setMailboxActiveId(id)}
        />
        {/* Compose button inside secondary nav */}
        <div className="mailbox-preview__compose">
          <Button variant="primary" size="s" label="Compose new" iconLeft={<Icon name="compose-ultra" />} />
        </div>
      </div>

      {/* Content area */}
      <div className="mailbox-preview__main">
        <MainAppbar
          breadcrumbs={[
            { label: 'Mailbox (viletdesign@elevatus.io)' },
          ]}
        />

        <div className="mailbox-preview__content">
          <div className="mailbox-preview__inbox-panel">
            <h2 className="mailbox-preview__inbox-title">Inbox</h2>
            <div className="mailbox-preview__inbox-search">
              <Icon name="search-ultra" />
              <span>Search inbox..</span>
            </div>
            <div className="mailbox-preview__inbox-list">
              {INBOX_ITEMS.map((item) => (
                <div key={item.id} className="mailbox-preview__inbox-item">
                  <div className="mailbox-preview__inbox-sender">{item.sender}</div>
                  <div className="mailbox-preview__inbox-subject">{item.subject}</div>
                  <div className="mailbox-preview__inbox-preview">{item.preview}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
