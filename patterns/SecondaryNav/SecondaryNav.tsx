import { type ReactNode } from 'react';
import './SecondaryNav.css';
import Tab from '../../components/VerticalTab/Tab';
import Icon, { type IconName } from '../../components/Icon/Icon';

/* -- Data types ----------------------------------------------------------- */

export interface SecondaryNavItem {
  id: string;
  label: string;
  icon?: IconName;
  count?: number;
  hasChildren?: boolean;
  children?: SecondaryNavItem[];
}

export interface SecondaryNavSection {
  id: string;
  title: string;
  items: SecondaryNavItem[];
}

export interface SecondaryNavProps {
  /** Icon displayed in the header icon box */
  headerIcon: ReactNode;
  /** Module name shown in the header */
  headerLabel: string;
  /** Sections rendered in the scrollable area */
  sections: SecondaryNavSection[];
  /** Currently active (selected) item id */
  activeId?: string;
  /** Set of currently expanded item ids */
  openIds?: Set<string>;
  onItemClick?: (id: string) => void;
  onToggle?: (id: string) => void;
  onActionsClick?: (id: string) => void;
}

/* -- Component ------------------------------------------------------------ */

export default function SecondaryNav({
  headerIcon,
  headerLabel,
  sections,
  activeId,
  openIds,
  onItemClick,
  onToggle,
  onActionsClick,
}: SecondaryNavProps) {
  function renderItem(item: SecondaryNavItem, level: 1 | 2 = 1) {
    const isOpen = openIds?.has(item.id) ?? false;

    return (
      <div key={item.id}>
        <Tab
          variant="default"
          size="s"
          label={item.label}
          icon={item.icon ? <Icon name={item.icon} /> : undefined}
          count={item.count}
          level={level}
          hasChildren={item.hasChildren}
          isActive={activeId === item.id}
          isOpen={isOpen}
          onClick={() => onItemClick?.(item.id)}
          onToggle={() => onToggle?.(item.id)}
          onActionsClick={
            onActionsClick ? () => onActionsClick(item.id) : undefined
          }
        />
        {item.hasChildren && isOpen && item.children?.map((child) =>
          renderItem(child, 2),
        )}
      </div>
    );
  }

  return (
    <nav className="secondary-nav" aria-label={headerLabel}>
      {/* -- Header -- */}
      <div className="secondary-nav__header">
        <span className="secondary-nav__header-icon" aria-hidden="true">
          {headerIcon}
        </span>
        <span className="secondary-nav__header-label">{headerLabel}</span>
      </div>

      {/* -- Scrollable sections -- */}
      <div className="secondary-nav__body">
        {sections.map((section) => (
          <div key={section.id} className="secondary-nav__section">
            <h3 className="secondary-nav__section-title">{section.title}</h3>
            <div className="secondary-nav__section-items">
              {section.items.map((item) => renderItem(item))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
