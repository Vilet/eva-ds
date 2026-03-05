/**
 * VerticalTab tests — Vitest + Testing Library
 *
 * ⚠️  Test runner not yet installed. To run these tests:
 *     npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom
 *     npm install --save-dev @axe-core/react axe-core
 * Flag for human approval before adding dependencies.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tab from './Tab';
import Icon from '../Icon/Icon';

const FolderIcon = () => <Icon name="folder-ultra" />;

describe('Tab — default variant', () => {
  it('renders label', () => {
    render(<Tab size="m" label="My Tab" />);
    expect(screen.getByText('My Tab')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Tab size="m" label="My Tab" icon={<FolderIcon />} />);
    // Icon is aria-hidden — test the wrapper
    expect(document.querySelector('.tab__icon')).toBeInTheDocument();
  });

  it('renders count when provided', () => {
    render(<Tab size="m" label="My Tab" count={12} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders chevron button when hasChildren=true', () => {
    render(<Tab size="m" label="My Tab" hasChildren />);
    expect(screen.getByRole('button', { name: /Expand My Tab/i })).toBeInTheDocument();
  });

  it('chevron shows collapse label when isOpen=true', () => {
    render(<Tab size="m" label="My Tab" hasChildren isOpen />);
    expect(screen.getByRole('button', { name: /Collapse My Tab/i })).toBeInTheDocument();
  });

  it('calls onToggle when chevron clicked', async () => {
    const onToggle = vi.fn();
    render(<Tab size="m" label="My Tab" hasChildren onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: /Expand/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when row clicked', async () => {
    const onClick = vi.fn();
    render(<Tab size="m" label="My Tab" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'My Tab' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies tab--active class when isActive=true', () => {
    render(<Tab size="m" label="My Tab" isActive />);
    expect(document.querySelector('.tab--active')).toBeInTheDocument();
  });

  it('applies tab--level-2 class when level=2', () => {
    render(<Tab size="m" label="My Tab" level={2} />);
    expect(document.querySelector('.tab--level-2')).toBeInTheDocument();
  });

  it('renders actions button when onActionsClick is provided', () => {
    render(<Tab size="m" label="My Tab" onActionsClick={vi.fn()} />);
    expect(screen.getByRole('button', { name: /More options for My Tab/i })).toBeInTheDocument();
  });

  it('calls onActionsClick when actions button clicked', async () => {
    const onActionsClick = vi.fn();
    render(<Tab size="m" label="My Tab" onActionsClick={onActionsClick} />);
    await userEvent.click(screen.getByRole('button', { name: /More options/i }));
    expect(onActionsClick).toHaveBeenCalledTimes(1);
  });

  it('chevron click does not propagate to row onClick', async () => {
    const onClick = vi.fn();
    const onToggle = vi.fn();
    render(<Tab size="m" label="My Tab" hasChildren onClick={onClick} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: /Expand/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('row is keyboard accessible via Enter', async () => {
    const onClick = vi.fn();
    render(<Tab size="m" label="My Tab" onClick={onClick} />);
    screen.getByRole('button', { name: 'My Tab' }).focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Tab — nav-icon variant', () => {
  it('renders as a single button', () => {
    render(<Tab variant="nav-icon" size="m" label="Label" icon={<FolderIcon />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('uses ariaLabel when provided', () => {
    render(<Tab variant="nav-icon" size="m" label="Label" icon={<FolderIcon />} ariaLabel="My section" />);
    expect(screen.getByRole('button', { name: 'My section' })).toBeInTheDocument();
  });

  it('applies aria-current=page when isActive', () => {
    render(<Tab variant="nav-icon" size="m" label="Label" icon={<FolderIcon />} isActive />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Tab variant="nav-icon" size="m" label="Label" icon={<FolderIcon />} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
