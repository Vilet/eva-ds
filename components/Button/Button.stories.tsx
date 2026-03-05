/**
 * Button stories — Storybook CSF3 format
 *
 * ⚠️  Storybook is not yet installed. To run these stories:
 *     npm install --save-dev @storybook/react-vite @storybook/react
 *     npx storybook init
 * Flag for human approval before adding the dependency.
 */

import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

// Simple inline SVGs for story icons
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconChevron = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M5 7l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'solo-floating', 'wrapped'],
    },
    size: {
      control: 'select',
      options: ['m', 's', 'xs', 'xxs'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Primary ────────────────────────────────────────────────────────────────

export const PrimaryM: Story = {
  args: { variant: 'primary', size: 'm', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const PrimaryS: Story = {
  args: { variant: 'primary', size: 's', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const PrimaryDisabled: Story = {
  args: { variant: 'primary', size: 'm', label: 'Button', iconLeft: <IconPlus />, disabled: true },
};

export const PrimaryLoading: Story = {
  args: { variant: 'primary', size: 'm', label: 'Button', loading: true },
};

// ── Secondary ──────────────────────────────────────────────────────────────

export const SecondaryM: Story = {
  args: { variant: 'secondary', size: 'm', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const SecondaryS: Story = {
  args: { variant: 'secondary', size: 's', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const SecondaryXS: Story = {
  args: { variant: 'secondary', size: 'xs', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const SecondaryDisabled: Story = {
  args: { variant: 'secondary', size: 'm', label: 'Button', disabled: true },
};

export const SecondaryLoading: Story = {
  args: { variant: 'secondary', size: 'm', label: 'Button', loading: true },
};

// ── Ghost ──────────────────────────────────────────────────────────────────

export const GhostM: Story = {
  args: { variant: 'ghost', size: 'm', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const GhostS: Story = {
  args: { variant: 'ghost', size: 's', label: 'Button', iconLeft: <IconPlus />, iconRight: <IconChevron /> },
};

export const GhostXS: Story = {
  args: { variant: 'ghost', size: 'xs', label: 'Button', iconLeft: <IconPlus /> },
};

export const GhostXXS: Story = {
  args: { variant: 'ghost', size: 'xxs', label: 'Button' },
};

export const GhostDisabled: Story = {
  args: { variant: 'ghost', size: 'm', label: 'Button', disabled: true },
};

export const GhostLoading: Story = {
  args: { variant: 'ghost', size: 'm', label: 'Button', loading: true },
};

// ── Solo-floating ──────────────────────────────────────────────────────────

export const SoloFloatingS: Story = {
  args: { variant: 'solo-floating', size: 's', iconLeft: <IconPlus />, ariaLabel: 'Add item' },
};

export const SoloFloatingXS: Story = {
  args: { variant: 'solo-floating', size: 'xs', iconLeft: <IconPlus />, ariaLabel: 'Add item' },
};

// ── Wrapped ────────────────────────────────────────────────────────────────

export const WrappedS: Story = {
  args: { variant: 'wrapped', size: 's', iconLeft: <IconPlus />, ariaLabel: 'Add item' },
};

export const WrappedXS: Story = {
  args: { variant: 'wrapped', size: 'xs', iconLeft: <IconPlus />, ariaLabel: 'Edit' },
};

export const WrappedXXS: Story = {
  args: { variant: 'wrapped', size: 'xxs', iconLeft: <IconPlus />, ariaLabel: 'More' },
};
