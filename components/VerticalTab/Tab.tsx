import { type ReactNode } from 'react';
import './Tab.css';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

export type TabSize    = 's' | 'm' | 'l';
export type TabLevel   = 1 | 2;
export type TabVariant = 'default' | 'nav-icon';

export interface TabProps {
  label:           string;
  icon?:           ReactNode;
  count?:          number;
  size:            TabSize;
  level?:          TabLevel;
  variant?:        TabVariant;
  isActive?:       boolean;
  isOpen?:         boolean;
  isMinimized?:    boolean;       // nav-icon only — shows icon box only, no label
  hasIconBoxBg?:   boolean;       // nav-icon only — false removes colored fill from icon box (regular section tabs)
  hasChildren?:    boolean;
  onClick?:        () => void;
  onToggle?:       () => void;
  onActionsClick?: () => void;
  ariaLabel?:      string;
}

export default function Tab({
  label,
  icon,
  count,
  size,
  level = 1,
  variant = 'default',
  isActive = false,
  isOpen = false,
  isMinimized = false,
  hasIconBoxBg = true,
  hasChildren = false,
  onClick,
  onToggle,
  onActionsClick,
  ariaLabel,
}: TabProps) {
  // ── Nav-icon variant ──────────────────────────────────────────────────────
  if (variant === 'nav-icon') {
    return (
      <button
        type="button"
        className={[
          'tab',
          'tab--nav-icon',
          `tab--${size}`,
          isActive      ? 'tab--active'      : '',
          isMinimized   ? 'tab--minimized'   : '',
          !hasIconBoxBg ? 'tab--no-icon-bg'  : '',
        ].filter(Boolean).join(' ')}
        onClick={onClick}
        aria-label={ariaLabel ?? label}
        aria-current={isActive ? 'page' : undefined}
      >
        {isMinimized ? (
          /* Minimized — icon box sits directly in the outer button, no wrapper */
          icon && <span className="tab__nav-icon-box" aria-hidden="true">{icon}</span>
        ) : (
          /* Full-width — inner body wraps icon box + label */
          <span className="tab__nav-body">
            {icon && <span className="tab__nav-icon-box" aria-hidden="true">{icon}</span>}
            <span className="tab__label">{label}</span>
          </span>
        )}
      </button>
    );
  }

  // ── Default variant ───────────────────────────────────────────────────────
  const rootClass = [
    'tab',
    `tab--${size}`,
    `tab--level-${level}`,
    isActive    ? 'tab--active'      : '',
    isOpen      ? 'tab--open'        : '',
    hasChildren ? 'tab--collapsible' : '',
  ].filter(Boolean).join(' ');

  function handleRowClick() {
    onClick?.();
    if (hasChildren) onToggle?.();
  }

  return (
    <div className={rootClass}>
      {/* Main row — selects the tab; chevron is inside, not a separate button */}
      <button
        type="button"
        className="tab__row-btn"
        onClick={handleRowClick}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-label={ariaLabel}
      >
        {hasChildren && (
          <Icon
            name={isOpen ? 'corner-down' : 'corner-right'}
            className="tab__chevron"
          />
        )}
        {icon && <span className="tab__icon" aria-hidden="true">{icon}</span>}
        <span className="tab__label">{label}</span>
      </button>

      {count !== undefined && (
        <span className="tab__count" aria-label={`${count} items`}>{count}</span>
      )}

      {/* Actions button — inline sibling, shown on hover / active */}
      {onActionsClick && (
        <span className="tab__actions-wrapper">
          <Button
            variant="ghost"
            size="xxs"
            iconLeft={<Icon name="more-horizontal" />}
            ariaLabel={`More options for ${label}`}
            onClick={(e) => { e.stopPropagation(); onActionsClick(); }}
          />
        </span>
      )}
    </div>
  );
}
