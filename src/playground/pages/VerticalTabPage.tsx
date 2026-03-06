import { useState } from 'react';
import './VerticalTabPage.css';
import Tab, { type TabSize } from '../../../components/VerticalTab/Tab';
import Icon from '../../../components/Icon/Icon';

// ── Demo icons ──────────────────────────────────────────────────────────────

function FolderIcon() {
  return <Icon name="folder-ultra" />;
}

function InboxIcon() {
  return <Icon name="inbox-ultra" />;
}

function UsersIcon() {
  return <Icon name="users-ultra" />;
}

function SettingIcon() {
  return <Icon name="setting-ultra" />;
}

// ── Toggle switch (reused from ButtonPage pattern) ──────────────────────────

interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <label htmlFor={id} className="pg-toggle">
      <input
        id={id}
        type="checkbox"
        className="pg-toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="pg-toggle__track" aria-hidden="true" />
      <span className="pg-toggle__label">{label}</span>
    </label>
  );
}

// ── Controls bar ────────────────────────────────────────────────────────────

interface ControlsBarProps {
  showIcon:     boolean;
  showCount:    boolean;
  hasChildren:  boolean;
  showActions:  boolean;
  onChangeIcon:     (v: boolean) => void;
  onChangeCount:    (v: boolean) => void;
  onChangeChildren: (v: boolean) => void;
  onChangeActions:  (v: boolean) => void;
}

function ControlsBar({
  showIcon, showCount, hasChildren, showActions,
  onChangeIcon, onChangeCount, onChangeChildren, onChangeActions,
}: ControlsBarProps) {
  return (
    <div className="controls-bar" role="group" aria-label="Tab preview controls">
      <span className="controls-bar__label">Controls</span>
      <div className="controls-bar__toggles">
        <Toggle id="ctrl-icon"     label="Icon"           checked={showIcon}    onChange={onChangeIcon} />
        <Toggle id="ctrl-count"    label="Count"          checked={showCount}   onChange={onChangeCount} />
        <Toggle id="ctrl-children" label="Has children"   checked={hasChildren} onChange={onChangeChildren} />
        <Toggle id="ctrl-actions"  label="Actions (···)"  checked={showActions} onChange={onChangeActions} />
      </div>
      <span className="controls-bar__hint">Applies to states matrix rows below</span>
    </div>
  );
}

// ── States matrix ───────────────────────────────────────────────────────────

interface StatesMatrixProps {
  sizes:       TabSize[];
  icon?:       React.ReactNode;
  count?:      number;
  hasChildren: boolean;
  showActions: boolean;
}

function StatesMatrix({ sizes, icon, count, hasChildren, showActions }: StatesMatrixProps) {
  const cols = ['Default', 'Hover ↕', 'Active', 'Open (children)'];

  return (
    <div className="tab-states-matrix">
      <div className="tab-states-matrix__header">
        <span className="tab-states-matrix__size-col" />
        {cols.map((col) => (
          <span key={col} className="tab-states-matrix__col-label">{col}</span>
        ))}
      </div>

      {sizes.map((size) => (
        <div key={size} className="tab-states-matrix__row">
          <span className="tab-states-matrix__size-label">{size.toUpperCase()}</span>

          {/* Default */}
          <div className="tab-states-matrix__cell">
            <Tab size={size} label="Tab title" icon={icon} count={count}
              hasChildren={hasChildren}
              onActionsClick={showActions ? () => {} : undefined}
            />
          </div>

          {/* Hover — forced via CSS wrapper */}
          <div className="tab-states-matrix__cell">
            <div className="demo-force-hover">
              <Tab size={size} label="Tab title" icon={icon} count={count}
                hasChildren={hasChildren}
                onActionsClick={showActions ? () => {} : undefined}
              />
            </div>
          </div>

          {/* Active */}
          <div className="tab-states-matrix__cell">
            <Tab size={size} label="Tab title" icon={icon} count={count}
              hasChildren={hasChildren} isActive
              onActionsClick={showActions ? () => {} : undefined}
            />
          </div>

          {/* Open — with chevron, expanded */}
          <div className="tab-states-matrix__cell">
            <Tab size={size} label="Tab title" icon={icon}
              hasChildren isOpen
              onActionsClick={showActions ? () => {} : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Interactive demo (real expand/collapse + selection) ─────────────────────

interface TabItem {
  id: string;
  label: string;
  count?: number;
  children?: TabItem[];
}

const DEMO_TREE: TabItem[] = [
  { id: 'pipelines', label: 'Pipelines', count: 5, children: [
    { id: 'engineering', label: 'Engineering', count: 12 },
    { id: 'design',      label: 'Design',      count: 3 },
    { id: 'marketing',   label: 'Marketing',   count: 8 },
  ]},
  { id: 'templates',  label: 'Templates',  count: 14 },
  { id: 'candidates', label: 'Candidates', count: 42, children: [
    { id: 'active',   label: 'Active',   count: 18 },
    { id: 'archived', label: 'Archived', count: 24 },
  ]},
  { id: 'settings', label: 'Settings' },
];

function InteractiveDemo({ size }: { size: TabSize }) {
  const [activeId, setActiveId]   = useState('engineering');
  const [openIds,  setOpenIds]    = useState<Set<string>>(new Set(['pipelines']));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div className="interactive-demo">
      {DEMO_TREE.map((item) => (
        <div key={item.id}>
          <Tab
            size={size}
            label={item.label}
            icon={<FolderIcon />}
            count={item.children ? undefined : item.count}
            hasChildren={!!item.children}
            isOpen={openIds.has(item.id)}
            isActive={activeId === item.id}
            onClick={() => setActiveId(item.id)}
            onToggle={() => toggle(item.id)}
            onActionsClick={() => {}}
          />
          {item.children && openIds.has(item.id) && (
            <div className="interactive-demo__children">
              {item.children.map((child) => (
                <Tab
                  key={child.id}
                  size={size}
                  label={child.label}
                  icon={<FolderIcon />}
                  count={child.count}
                  level={2}
                  isActive={activeId === child.id}
                  onClick={() => setActiveId(child.id)}
                  onActionsClick={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Nav-icon demo ───────────────────────────────────────────────────────────

function NavIconDemo({ size }: { size: TabSize }) {
  const [activeId, setActiveId] = useState('inbox');
  const items = [
    { id: 'inbox',   label: 'Inbox',    icon: <InboxIcon /> },
    { id: 'users',   label: 'People',   icon: <UsersIcon /> },
    { id: 'setting', label: 'Settings', icon: <SettingIcon /> },
  ];
  return (
    <div className="nav-icon-demo">
      {items.map((item) => (
        <Tab
          key={item.id}
          variant="nav-icon"
          size={size}
          label={item.label}
          icon={item.icon}
          isActive={activeId === item.id}
          onClick={() => setActiveId(item.id)}
        />
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function VerticalTabPage() {
  const [showIcon,    setShowIcon]    = useState(true);
  const [showCount,   setShowCount]   = useState(true);
  const [hasChildren, setHasChildren] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const icon  = showIcon  ? <FolderIcon /> : undefined;
  const count = showCount ? 12             : undefined;

  return (
    <div className="vertical-tab-page">
      {/* ── Page header ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Vertical Tab</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          2 variants (default, nav-icon) × 3 sizes × 4 states. Toggle optional elements
          with the controls bar. Hover and active states marked ↕ are forced for reference.
        </p>
      </div>

      {/* ── Default — all sizes ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Default</h2>
          <p className="variant-section__desc">
            Tree-style tab row. Sizes S, M, L × levels 1 and 2.
            Icon, count, chevron (children) and actions (···) are optional.
          </p>
        </div>
        <StatesMatrix
          sizes={['s', 'm', 'l']}
          icon={icon} count={count}
          hasChildren={hasChildren} showActions={showActions}
        />
      </section>

      {/* ── Level 2 ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Level 2 (nested)</h2>
          <p className="variant-section__desc">
            Same states as Level 1 but indented by <code>--spacing-xl</code>.
          </p>
        </div>
        <div className="tab-states-matrix">
          <div className="tab-states-matrix__header">
            <span className="tab-states-matrix__size-col" />
            {['Default', 'Hover ↕', 'Active'].map((col) => (
              <span key={col} className="tab-states-matrix__col-label">{col}</span>
            ))}
          </div>
          {(['s', 'm', 'l'] as TabSize[]).map((size) => (
            <div key={size} className="tab-states-matrix__row tab-states-matrix__row--3col">
              <span className="tab-states-matrix__size-label">{size.toUpperCase()}</span>
              <div className="tab-states-matrix__cell">
                <Tab size={size} label="Nested tab" icon={icon} count={count} level={2}
                  onActionsClick={showActions ? () => {} : undefined} />
              </div>
              <div className="tab-states-matrix__cell">
                <div className="demo-force-hover">
                  <Tab size={size} label="Nested tab" icon={icon} count={count} level={2}
                    onActionsClick={showActions ? () => {} : undefined} />
                </div>
              </div>
              <div className="tab-states-matrix__cell">
                <Tab size={size} label="Nested tab" icon={icon} count={count} level={2} isActive
                  onActionsClick={showActions ? () => {} : undefined} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive tree demo ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Interactive tree</h2>
          <p className="variant-section__desc">
            Real expand/collapse and selection. Try clicking rows and chevrons.
          </p>
        </div>
        <div className="interactive-demo-row">
          {(['s', 'm', 'l'] as TabSize[]).map((size) => (
            <div key={size} className="interactive-demo-col">
              <span className="demo-label">{size.toUpperCase()} size</span>
              <InteractiveDemo size={size} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Nav-icon variant ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Nav-icon</h2>
          <p className="variant-section__desc">
            Icon-based main navigation tab. Two modes: <strong>full-width</strong> (icon box + label)
            and <strong>minimized</strong> (icon box only, no label — used when the sidebar is collapsed).
            Active state shows a right-side accent line.
          </p>
        </div>

        {/* Full-width states matrix */}
        <p className="nav-icon-mode-label">Full width</p>
        <div className="nav-icon-states">
          {['Default', 'Hover ↕', 'Active'].map((colLabel, i) => (
            <div key={colLabel} className="nav-icon-states__col">
              <span className="nav-icon-states__col-label">{colLabel}</span>
              <div className={[
                'nav-icon-demo',
                i === 1 ? 'demo-force-hover' : '',
              ].filter(Boolean).join(' ')}>
                {(['s', 'm', 'l'] as TabSize[]).map((size) => (
                  <Tab
                    key={size}
                    variant="nav-icon"
                    size={size}
                    label={size.toUpperCase()}
                    icon={<FolderIcon />}
                    isActive={i === 2}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Minimized states matrix */}
        <p className="nav-icon-mode-label">Minimized</p>
        <div className="nav-icon-states nav-icon-states--minimized">
          {['Default', 'Hover ↕', 'Active'].map((colLabel, i) => (
            <div key={colLabel} className="nav-icon-states__col nav-icon-states__col--minimized">
              <span className="nav-icon-states__col-label">{colLabel}</span>
              <div className={[
                'nav-icon-demo--minimized',
                i === 1 ? 'demo-force-hover' : '',
              ].filter(Boolean).join(' ')}>
                {(['s', 'm', 'l'] as TabSize[]).map((size) => (
                  <Tab
                    key={size}
                    variant="nav-icon"
                    size={size}
                    label={size.toUpperCase()}
                    icon={<FolderIcon />}
                    isMinimized
                    isActive={i === 2}
                    ariaLabel={`${size.toUpperCase()} nav tab`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive nav-icon */}
        <div className="nav-icon-interactive-row">
          {(['s', 'm', 'l'] as TabSize[]).map((size) => (
            <div key={size} className="interactive-demo-col">
              <span className="demo-label">{size.toUpperCase()} size</span>
              <NavIconDemo size={size} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Sticky bottom controls panel ── */}
      <ControlsBar
        showIcon={showIcon}         onChangeIcon={setShowIcon}
        showCount={showCount}       onChangeCount={setShowCount}
        hasChildren={hasChildren}   onChangeChildren={setHasChildren}
        showActions={showActions}   onChangeActions={setShowActions}
      />
    </div>
  );
}
