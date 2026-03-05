/**
 * VerticalTab stories — Storybook CSF3 format
 *
 * ⚠️  Storybook is not yet installed. To run these stories:
 *     npm install --save-dev @storybook/react-vite @storybook/react
 *     npx storybook init
 * Flag for human approval before adding the dependency.
 */

import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';
import Icon from '../Icon/Icon';

const FolderIcon = () => <Icon name="folder-ultra" />;

const meta: Meta<typeof Tab> = {
  title: 'Components/VerticalTab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    size:    { control: 'select', options: ['s', 'm', 'l'] },
    level:   { control: 'select', options: [1, 2] },
    variant: { control: 'select', options: ['default', 'nav-icon'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

// ── Default variant — S ─────────────────────────────────────────────────────

export const DefaultS: Story = {
  args: { size: 's', label: 'Tab title', icon: <FolderIcon />, count: 12 },
};

export const DefaultSActive: Story = {
  args: { size: 's', label: 'Tab title', icon: <FolderIcon />, count: 12, isActive: true },
};

export const DefaultSCollapsible: Story = {
  args: { size: 's', label: 'Tab title', icon: <FolderIcon />, count: 12, hasChildren: true, isOpen: false },
};

export const DefaultSOpen: Story = {
  args: { size: 's', label: 'Tab title', icon: <FolderIcon />, hasChildren: true, isOpen: true },
};

export const DefaultSLevel2: Story = {
  args: { size: 's', label: 'Tab title', icon: <FolderIcon />, count: 12, level: 2 },
};

// ── Default variant — M ─────────────────────────────────────────────────────

export const DefaultM: Story = {
  args: { size: 'm', label: 'Tab title', icon: <FolderIcon />, count: 12 },
};

export const DefaultMActive: Story = {
  args: { size: 'm', label: 'Tab title', icon: <FolderIcon />, count: 12, isActive: true },
};

export const DefaultMCollapsible: Story = {
  args: { size: 'm', label: 'Tab title', icon: <FolderIcon />, count: 12, hasChildren: true },
};

export const DefaultMOpen: Story = {
  args: { size: 'm', label: 'Tab title', icon: <FolderIcon />, hasChildren: true, isOpen: true },
};

export const DefaultMLevel2: Story = {
  args: { size: 'm', label: 'Tab title', icon: <FolderIcon />, count: 12, level: 2 },
};

// ── Default variant — L ─────────────────────────────────────────────────────

export const DefaultL: Story = {
  args: { size: 'l', label: 'Tab title', icon: <FolderIcon />, count: 12 },
};

export const DefaultLActive: Story = {
  args: { size: 'l', label: 'Tab title', icon: <FolderIcon />, isActive: true },
};

export const DefaultLLevel2: Story = {
  args: { size: 'l', label: 'Tab title', icon: <FolderIcon />, count: 12, level: 2 },
};

// ── Nav-icon variant ────────────────────────────────────────────────────────

export const NavIconS: Story = {
  args: { variant: 'nav-icon', size: 's', label: 'Label', icon: <FolderIcon /> },
};

export const NavIconSActive: Story = {
  args: { variant: 'nav-icon', size: 's', label: 'Label', icon: <FolderIcon />, isActive: true },
};

export const NavIconM: Story = {
  args: { variant: 'nav-icon', size: 'm', label: 'Label', icon: <FolderIcon /> },
};

export const NavIconMActive: Story = {
  args: { variant: 'nav-icon', size: 'm', label: 'Label', icon: <FolderIcon />, isActive: true },
};

export const NavIconL: Story = {
  args: { variant: 'nav-icon', size: 'l', label: 'Label', icon: <FolderIcon /> },
};

export const NavIconLActive: Story = {
  args: { variant: 'nav-icon', size: 'l', label: 'Label', icon: <FolderIcon />, isActive: true },
};

export const NavIconNoLabel: Story = {
  args: { variant: 'nav-icon', size: 'm', label: '', icon: <FolderIcon />, ariaLabel: 'Folder' },
};
