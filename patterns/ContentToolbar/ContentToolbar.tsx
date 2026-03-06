import type { ReactNode } from 'react';
import './ContentToolbar.css';

export interface ContentToolbarProps {
  /** Left-side content — record counter, dropdown, or any contextual element */
  left?: ReactNode;
  /** Right-side action buttons (ghost XXS buttons) */
  children?: ReactNode;
}

export default function ContentToolbar({ left, children }: ContentToolbarProps) {
  return (
    <div className="content-toolbar">
      {left && <div className="content-toolbar__left">{left}</div>}
      {children && <div className="content-toolbar__actions">{children}</div>}
    </div>
  );
}
