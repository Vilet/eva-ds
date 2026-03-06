import { type ReactNode } from 'react';
import './MainAppbar.css';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface MainAppbarProps {
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}

export interface AppbarActionProps {
  icon: ReactNode;
  hasIndicator?: boolean;
  onClick?: () => void;
  ariaLabel: string;
}

export interface AppbarAvatarGroupProps {
  avatars: string[];
  count: number;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface AppbarAutomationProps {
  count: number;
  icon?: ReactNode;
  onClick?: () => void;
}

/* ── MainAppbar ──────────────────────────────────────────────────────────── */

export default function MainAppbar({ breadcrumbs, children }: MainAppbarProps) {
  return (
    <header className="main-appbar">
      <nav className="main-appbar__breadcrumbs" aria-label="Breadcrumbs">
        {breadcrumbs.map((item, index) => (
          <span key={index} style={{ display: 'contents' }}>
            {index > 0 && (
              <span className="main-appbar__separator" aria-hidden="true">
                &rarr;
              </span>
            )}
            <Button
              variant="ghost"
              size="xxs"
              label={item.label}
              onClick={item.onClick}
              ariaLabel={item.label}
            />
          </span>
        ))}
      </nav>

      {children && (
        <div className="main-appbar__controls">{children}</div>
      )}
    </header>
  );
}

/* ── AppbarAction ────────────────────────────────────────────────────────── */

export function AppbarAction({
  icon,
  hasIndicator = false,
  onClick,
  ariaLabel,
}: AppbarActionProps) {
  return (
    <span className="appbar-action">
      <Button
        variant="ghost"
        size="s"
        iconLeft={icon}
        onClick={onClick}
        ariaLabel={ariaLabel}
      />
      {hasIndicator && (
        <span className="appbar-action__indicator" aria-hidden="true">
          <Icon name="indicator-dot" />
        </span>
      )}
    </span>
  );
}

/* ── AppbarAvatarGroup ───────────────────────────────────────────────────── */

export function AppbarAvatarGroup({
  avatars,
  count,
  onClick,
  ariaLabel,
}: AppbarAvatarGroupProps) {
  return (
    <button
      type="button"
      className="appbar-avatar-group"
      onClick={onClick}
      aria-label={ariaLabel ?? `${count} users`}
    >
      <span className="appbar-avatar-group__avatars">
        {avatars.map((src, index) => (
          <img
            key={index}
            className="appbar-avatar-group__avatar"
            src={src}
            alt=""
            aria-hidden="true"
          />
        ))}
      </span>
      <span className="appbar-avatar-group__count">{count}</span>
    </button>
  );
}

/* ── AppbarAutomation ────────────────────────────────────────────────────── */

export function AppbarAutomation({
  count,
  icon,
  onClick,
}: AppbarAutomationProps) {
  const label = `${count} Automation${count !== 1 ? 's' : ''}`;
  return (
    <Button
      variant="ghost"
      size="s"
      iconLeft={icon ?? <Icon name="zap-ultra" />}
      label={label}
      onClick={onClick}
      ariaLabel={label}
    />
  );
}
