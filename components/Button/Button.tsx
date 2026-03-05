import type { MouseEventHandler, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'solo-floating' | 'wrapped';
export type ButtonSize = 'm' | 's' | 'xs' | 'xxs';

export interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Required when label is absent (icon-only button) */
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant,
  size,
  label,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  onClick,
  ariaLabel,
  type = 'button',
}: ButtonProps) {
  const isIconOnly = !label;

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    isIconOnly ? 'btn--icon-only' : '',
    loading ? 'btn--loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {loading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : iconLeft ? (
        <span className="btn__icon" aria-hidden="true">
          {iconLeft}
        </span>
      ) : null}

      {label && <span className="btn__label">{label}</span>}

      {iconRight && !loading && (
        <span className="btn__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
