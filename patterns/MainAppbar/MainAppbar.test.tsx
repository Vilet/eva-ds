/**
 * MainAppbar tests — Vitest + @testing-library/react
 *
 * Same test runner caveat as Button.test.tsx — see that file for install instructions.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import MainAppbar, {
  AppbarAction,
  AppbarAvatarGroup,
  AppbarAutomation,
} from './MainAppbar';

const IconStub = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
  </svg>
);

// ── MainAppbar ──────────────────────────────────────────────────────────────

describe('MainAppbar — rendering', () => {
  it('renders a header element', () => {
    render(<MainAppbar breadcrumbs={[{ label: 'Home' }]} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders breadcrumb labels', () => {
    render(
      <MainAppbar breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]} />,
    );
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('renders separator between breadcrumbs', () => {
    const { container } = render(
      <MainAppbar breadcrumbs={[{ label: 'A' }, { label: 'B' }]} />,
    );
    const separators = container.querySelectorAll('.main-appbar__separator');
    expect(separators).toHaveLength(1);
  });

  it('renders children in controls area', () => {
    render(
      <MainAppbar breadcrumbs={[{ label: 'Home' }]}>
        <span data-testid="child">Control</span>
      </MainAppbar>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('does not render controls area when no children', () => {
    const { container } = render(
      <MainAppbar breadcrumbs={[{ label: 'Home' }]} />,
    );
    expect(container.querySelector('.main-appbar__controls')).not.toBeInTheDocument();
  });
});

describe('MainAppbar — breadcrumb interaction', () => {
  it('calls onClick when breadcrumb is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <MainAppbar
        breadcrumbs={[
          { label: 'Data', onClick: handleClick },
          { label: 'Templates' },
        ]}
      />,
    );
    await user.click(screen.getByText('Data'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ── AppbarAction ────────────────────────────────────────────────────────────

describe('AppbarAction', () => {
  it('renders a button with aria-label', () => {
    render(<AppbarAction icon={<IconStub />} ariaLabel="Inbox" />);
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('renders indicator dot when hasIndicator is true', () => {
    const { container } = render(
      <AppbarAction icon={<IconStub />} hasIndicator ariaLabel="Inbox" />,
    );
    expect(container.querySelector('.appbar-action__indicator')).toBeInTheDocument();
  });

  it('does not render indicator dot by default', () => {
    const { container } = render(
      <AppbarAction icon={<IconStub />} ariaLabel="Tasks" />,
    );
    expect(container.querySelector('.appbar-action__indicator')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <AppbarAction icon={<IconStub />} onClick={handleClick} ariaLabel="Inbox" />,
    );
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ── AppbarAvatarGroup ───────────────────────────────────────────────────────

describe('AppbarAvatarGroup', () => {
  const avatars = [
    'https://example.com/a.jpg',
    'https://example.com/b.jpg',
  ];

  it('renders avatar images', () => {
    const { container } = render(
      <AppbarAvatarGroup avatars={avatars} count={5} />,
    );
    const imgs = container.querySelectorAll('.appbar-avatar-group__avatar');
    expect(imgs).toHaveLength(2);
  });

  it('renders count', () => {
    render(<AppbarAvatarGroup avatars={avatars} count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <AppbarAvatarGroup avatars={avatars} count={5} onClick={handleClick} />,
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses ariaLabel when provided', () => {
    render(
      <AppbarAvatarGroup
        avatars={avatars}
        count={5}
        ariaLabel="View collaborators"
      />,
    );
    expect(screen.getByRole('button', { name: 'View collaborators' })).toBeInTheDocument();
  });
});

// ── AppbarAutomation ────────────────────────────────────────────────────────

describe('AppbarAutomation', () => {
  it('renders automation count label', () => {
    render(<AppbarAutomation count={3} />);
    expect(screen.getByText('3 Automations')).toBeInTheDocument();
  });

  it('renders singular form for count=1', () => {
    render(<AppbarAutomation count={1} />);
    expect(screen.getByText('1 Automation')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AppbarAutomation count={2} onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: '2 Automations' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ── Accessibility ───────────────────────────────────────────────────────────

describe('MainAppbar — accessibility', () => {
  it('has breadcrumbs nav with aria-label', () => {
    render(<MainAppbar breadcrumbs={[{ label: 'Home' }]} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs' })).toBeInTheDocument();
  });

  it('full appbar has no axe violations', async () => {
    const { container } = render(
      <MainAppbar breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}>
        <AppbarAvatarGroup
          avatars={['https://example.com/a.jpg']}
          count={3}
        />
        <AppbarAutomation count={2} />
        <AppbarAction icon={<IconStub />} ariaLabel="Inbox" hasIndicator />
        <AppbarAction icon={<IconStub />} ariaLabel="Tasks" />
      </MainAppbar>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
