import { type ReactNode } from 'react';
import './ListRecord.css';

/* -- Types ----------------------------------------------------------------- */

export interface ListRecordProps {
  /** Full leading icon element (consumer provides 32px container + background) */
  leadingIcon?: ReactNode;
  /** Record title — single line, truncated with milk-fade overlay */
  title: string;
  /** Metadata elements — rendered as flex children after the title */
  children?: ReactNode;
  /** Floating action buttons — shown on hover */
  actions?: ReactNode;
  /** Selected / active state */
  selected?: boolean;
  /** Click handler for the entire row */
  onClick?: () => void;
}

/* -- ListRecord ------------------------------------------------------------ */

export default function ListRecord({
  leadingIcon,
  title,
  children,
  actions,
  selected = false,
  onClick,
}: ListRecordProps) {
  return (
    <div
      className={`list-record${selected ? ' list-record--selected' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {leadingIcon && (
        <div className="list-record__icon-slot">{leadingIcon}</div>
      )}

      <div className="list-record__content">
        <div className="list-record__title">
          <span className="list-record__title-text">{title}</span>
        </div>
        {children}
      </div>

      {actions && (
        <div className="list-record__actions">{actions}</div>
      )}
    </div>
  );
}
