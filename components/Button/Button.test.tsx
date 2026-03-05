/**
 * Button tests — Vitest + @testing-library/react
 *
 * ⚠️  Test runner is not yet installed. To run these tests:
 *     npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
 *     npm install --save-dev @testing-library/user-event jest-axe
 *     Add `test: { environment: 'jsdom' }` to vite.config.ts
 * Flag for human approval before adding these dependencies.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Button from './Button';

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Rendering ──────────────────────────────────────────────────────────────

describe('Button — rendering', () => {
  it('renders a native <button> element', () => {
    render(<Button variant="primary" size="m" label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<Button variant="primary" size="m" label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders without label (icon-only)', () => {
    render(<Button variant="ghost" size="s" iconLeft={<IconPlus />} ariaLabel="Add item" />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Button variant="secondary" size="s" label="Button" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('btn--secondary', 'btn--s');
  });

  it('applies btn--icon-only class when label is absent', () => {
    render(<Button variant="ghost" size="xs" iconLeft={<IconPlus />} ariaLabel="Add" />);
    expect(screen.getByRole('button')).toHaveClass('btn--icon-only');
  });

  it('sets type="button" by default', () => {
    render(<Button variant="primary" size="m" label="Button" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects type prop', () => {
    render(<Button variant="primary" size="m" label="Submit" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

// ── Props ──────────────────────────────────────────────────────────────────

describe('Button — props', () => {
  it('is disabled when disabled=true', () => {
    render(<Button variant="primary" size="m" label="Button" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading=true', () => {
    render(<Button variant="primary" size="m" label="Button" loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy="true" when loading', () => {
    render(<Button variant="primary" size="m" label="Button" loading />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button variant="primary" size="m" label="Button" />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('applies btn--loading class when loading', () => {
    render(<Button variant="primary" size="m" label="Button" loading />);
    expect(screen.getByRole('button')).toHaveClass('btn--loading');
  });

  it('renders spinner when loading (replaces iconLeft)', () => {
    render(<Button variant="primary" size="m" label="Button" iconLeft={<IconPlus />} loading />);
    expect(document.querySelector('.btn__spinner')).toBeInTheDocument();
    // iconLeft should NOT be rendered when loading
    expect(document.querySelector('.btn__icon')).not.toBeInTheDocument();
  });

  it('renders iconLeft when not loading', () => {
    render(<Button variant="primary" size="m" label="Button" iconLeft={<IconPlus />} />);
    expect(document.querySelector('.btn__icon')).toBeInTheDocument();
    expect(document.querySelector('.btn__spinner')).not.toBeInTheDocument();
  });
});

// ── Interaction ────────────────────────────────────────────────────────────

describe('Button — interaction', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button variant="primary" size="m" label="Click me" onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button variant="primary" size="m" label="Click me" onClick={handleClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button variant="primary" size="m" label="Click me" onClick={handleClick} loading />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ── Keyboard navigation ────────────────────────────────────────────────────

describe('Button — keyboard', () => {
  it('is focusable via Tab', async () => {
    const user = userEvent.setup();
    render(<Button variant="primary" size="m" label="Focus me" />);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('triggers onClick on Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button variant="primary" size="m" label="Press enter" onClick={handleClick} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onClick on Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button variant="primary" size="m" label="Press space" onClick={handleClick} />);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is not focusable when disabled', async () => {
    const user = userEvent.setup();
    render(<Button variant="primary" size="m" label="Disabled" disabled />);
    await user.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });
});

// ── Accessibility ──────────────────────────────────────────────────────────

describe('Button — accessibility', () => {
  it('primary button has no axe violations', async () => {
    const { container } = render(<Button variant="primary" size="m" label="Submit" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('icon-only button with ariaLabel has no axe violations', async () => {
    const { container } = render(
      <Button variant="ghost" size="xs" iconLeft={<IconPlus />} ariaLabel="Add item" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('disabled button has no axe violations', async () => {
    const { container } = render(<Button variant="secondary" size="m" label="Save" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('loading button has no axe violations', async () => {
    const { container } = render(<Button variant="primary" size="m" label="Saving…" loading />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
