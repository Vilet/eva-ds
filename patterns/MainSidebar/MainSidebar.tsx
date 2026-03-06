import { type ReactNode } from 'react';
import './MainSidebar.css';
import Tab from '../../components/VerticalTab/Tab';
import Icon, { type IconName } from '../../components/Icon/Icon';

/* ── Data types ─────────────────────────────────────────────────────────── */

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: IconName;
  /** 'branded' shows a colored 28×28 icon box; 'regular' shows a transparent icon box */
  type: 'regular' | 'branded';
}

export interface SidebarNavGroup {
  id: string;
  items: SidebarNavItem[];
}

export type SidebarState = 'skeleton' | 'minimized' | 'open';

export interface MainSidebarProps {
  state: SidebarState;
  groups: SidebarNavGroup[];
  activeId?: string;
  branchName?: string;
  branchAvatar?: ReactNode;
  companyLogo?: ReactNode;
  onToggle?: () => void;
  onItemClick?: (id: string) => void;
  onBranchClick?: () => void;
}

/* ── Skeleton groups layout (matches Figma minimized skeleton) ──────────── */

const SKELETON_GROUPS = [
  { regularCount: 0, brandedCount: 2 },
  { regularCount: 0, brandedCount: 5 },
  { regularCount: 3, brandedCount: 0 },
  { regularCount: 2, brandedCount: 0 },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function MainSidebar({
  state,
  groups,
  activeId,
  branchName,
  branchAvatar,
  companyLogo,
  onToggle,
  onItemClick,
  onBranchClick,
}: MainSidebarProps) {
  const isMinimized = state === 'minimized';
  const isOpen = state === 'open';
  const isSkeleton = state === 'skeleton';

  return (
    <nav
      className={`main-sidebar main-sidebar--${state}`}
      aria-label="Main navigation"
    >
      {/* ── Header ── */}
      <div className="main-sidebar__header">
        {isSkeleton ? (
          <div className="main-sidebar__skeleton-box main-sidebar__skeleton-box--avatar" />
        ) : (
          <>
            <button
              type="button"
              className="main-sidebar__branch-btn"
              onClick={onBranchClick}
              aria-label={branchName ? `Switch branch: ${branchName}` : 'Switch branch'}
            >
              <span className="main-sidebar__avatar">{branchAvatar}</span>
              {isOpen && (
                <>
                  <span className="main-sidebar__branch-name">{branchName}</span>
                  <span className="main-sidebar__branch-expand">
                    <Icon name="chevron-down-ultra" />
                  </span>
                </>
              )}
            </button>
            {isOpen && (
              <button
                type="button"
                className="main-sidebar__toggle-btn"
                onClick={onToggle}
                aria-label="Collapse sidebar"
              >
                <Icon name="chevrons-left-ultra" />
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Tabs area ── */}
      <div className="main-sidebar__tabs">
        {/* Expand trigger (minimized only) */}
        {isMinimized && (
          <button
            type="button"
            className="main-sidebar__expand-trigger"
            onClick={onToggle}
            aria-label="Expand sidebar"
          >
            <Icon name="chevrons-right-ultra" />
          </button>
        )}

        {isSkeleton ? (
          <SkeletonTabs />
        ) : (
          groups.map((group, gi) => (
            <div key={group.id}>
              {gi > 0 && (
                <div className="main-sidebar__divider">
                  <div className="main-sidebar__divider-line" />
                </div>
              )}
              <div className="main-sidebar__group">
                {group.items.map((item) => (
                  <div key={item.id}>
                    <Tab
                      variant="nav-icon"
                      size="m"
                      label={item.label}
                      icon={<Icon name={item.icon} />}
                      isMinimized={isMinimized}
                      hasIconBoxBg={item.type === 'branded'}
                      isActive={activeId === item.id}
                      onClick={() => onItemClick?.(item.id)}
                      ariaLabel={isMinimized ? item.label : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer ── */}
      {companyLogo && (
        <div className="main-sidebar__footer">
          <div className="main-sidebar__company-logo">{companyLogo}</div>
        </div>
      )}
    </nav>
  );
}

/* ── Skeleton tabs ──────────────────────────────────────────────────────── */

function SkeletonTabs() {
  return (
    <>
      {SKELETON_GROUPS.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && (
            <div className="main-sidebar__divider">
              <div className="main-sidebar__divider-line" />
            </div>
          )}
          <div className="main-sidebar__group">
            {Array.from({ length: group.regularCount }).map((_, i) => (
              <div key={`r-${i}`} className="main-sidebar__skeleton-row">
                <div className="main-sidebar__skeleton-box main-sidebar__skeleton-box--regular" />
              </div>
            ))}
            {Array.from({ length: group.brandedCount }).map((_, i) => (
              <div key={`b-${i}`} className="main-sidebar__skeleton-row">
                <div className="main-sidebar__skeleton-box main-sidebar__skeleton-box--branded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
