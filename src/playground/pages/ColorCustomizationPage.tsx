import { useState, useMemo, type CSSProperties } from 'react';
import { HexColorPicker } from 'react-colorful';
import './ColorCustomizationPage.css';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/VerticalTab/Tab';

/* ── Color math helpers ─────────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

function mix(c: [number, number, number], target: [number, number, number], amount: number): string {
  return rgbToHex(
    c[0] + (target[0] - c[0]) * amount,
    c[1] + (target[1] - c[1]) * amount,
    c[2] + (target[2] - c[2]) * amount,
  );
}

function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

/* ── Palette generation ─────────────────────────────────────────────────── */
/*
 * Inline style overrides can't re-trigger var() chains defined on :root.
 * So we resolve BOTH primitive AND semantic tokens to concrete values.
 */

function generateOverrides(primarySeed: string, secondarySeed: string): Record<string, string> {
  const white: [number, number, number] = [255, 255, 255];
  const black: [number, number, number] = [0, 0, 0];

  // ── Primary palette ──
  const pRgb = hexToRgb(primarySeed);
  const p80 = mix(pRgb, white, 0.8);
  const p40 = mix(pRgb, white, 0.4);
  const p0 = primarySeed;
  const pDark40Rgb = hexToRgb(mix(pRgb, black, 0.4));
  const pDark40 = rgbToHex(...pDark40Rgb);
  const pDark80 = mix(pRgb, black, 0.8);
  const pDark40_16 = rgba(...pDark40Rgb, 0.16);
  const pDark40_12 = rgba(...pDark40Rgb, 0.12);
  const pDark40_8 = rgba(...pDark40Rgb, 0.08);

  // ── Secondary palette ──
  const sRgb = hexToRgb(secondarySeed);
  const s80Rgb = hexToRgb(mix(sRgb, white, 0.8));
  const s80 = rgbToHex(...s80Rgb);
  const s80_48 = rgba(...s80Rgb, 0.48);
  const s40 = mix(sRgb, white, 0.4);
  const s0 = secondarySeed;
  const sDark40Rgb = hexToRgb(mix(sRgb, black, 0.4));
  const sDark40 = rgbToHex(...sDark40Rgb);
  const sDark80 = mix(sRgb, black, 0.8);
  const sDark40_16 = rgba(...sDark40Rgb, 0.16);
  const sDark40_12 = rgba(...sDark40Rgb, 0.12);
  const sDark40_8 = rgba(...sDark40Rgb, 0.08);

  return {
    // Primitives (primary)
    '--primitives-primary-primary-80': p80,
    '--primitives-primary-primary-40': p40,
    '--primitives-primary-primary-0': p0,
    '--primitives-primary-primary-dark-40': pDark40,
    '--primitives-primary-primary-dark-80': pDark80,
    '--primitives-primary-primary-dark-40-16': pDark40_16,
    '--primitives-primary-primary-dark-40-12': pDark40_12,
    '--primitives-primary-primary-dark-40-8': pDark40_8,

    // Primitives (secondary)
    '--primitives-secondary-secondary-80': s80,
    '--primitives-secondary-secondary-80-48': s80_48,
    '--primitives-secondary-secondary-40': s40,
    '--primitives-secondary-secondary-0': s0,
    '--primitives-secondary-secondary-dark-40': sDark40,
    '--primitives-secondary-secondary-dark-80': sDark80,
    '--primitives-secondary-secondary-dark-40-16': sDark40_16,
    '--primitives-secondary-secondary-dark-40-12': sDark40_12,
    '--primitives-secondary-secondary-dark-40-8': sDark40_8,

    // Semantic — primary interactive
    '--color-interactive-primary-default': p0,
    '--color-interactive-primary-hover': pDark40,
    '--color-interactive-primary-disabled': p40,
    '--color-interactive-primary-border-default': pDark40_12,
    '--color-interactive-primary-border-hover': pDark40_16,
    '--color-interactive-primary-border-active': p40,

    // Semantic — secondary interactive
    '--color-interactive-secondary-bg-highlighted': sDark40_8,
    '--color-interactive-secondary-bg-hover': sDark40_8,
    '--color-interactive-secondary-bg-active': sDark40_12,
    '--color-interactive-secondary-border-default': sDark40_12,
    '--color-interactive-secondary-border-hover': sDark40_16,
    '--color-interactive-secondary-border-active': sDark40_8,

    // Semantic — surfaces
    '--color-surface-card-bg-highlighted': sDark40_8,
    '--color-surface-sidepanel-bg': s80_48,
    '--color-surface-sidepanel-border': sDark40_8,
    '--color-surface-tab-active': sDark40_12,
  };
}

/* ── Default seed colors (from tokens) ─────────────────────────────────── */

const DEFAULT_PRIMARY = '#1b15cf';
const DEFAULT_SECONDARY = '#ffa764';

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ColorCustomizationPage() {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY);
  const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY);

  const overrides = useMemo<CSSProperties>(() => {
    return generateOverrides(primaryColor, secondaryColor) as unknown as CSSProperties;
  }, [primaryColor, secondaryColor]);

  return (
    <div className="color-custom-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Color Customization</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Pick primary and secondary seed colors to preview how the UI adapts in
          real time. Changes are isolated to this page.
        </p>
      </div>

      {/* ── Color pickers ──────────────────────────────────────────────── */}
      <div className="color-custom-page__pickers">
        <ColorPickerCard
          label="Primary"
          description="Main action buttons, links, active indicators"
          value={primaryColor}
          onChange={setPrimaryColor}
        />
        <ColorPickerCard
          label="Secondary"
          description="Surfaces, side panels, tab backgrounds"
          value={secondaryColor}
          onChange={setSecondaryColor}
        />
      </div>

      {/* ── Live preview (scoped overrides) ────────────────────────────── */}
      <div className="color-custom-page__preview" style={overrides}>
        <h2 className="color-custom-page__section-title">Live Preview</h2>

        {/* Buttons */}
        <div className="color-custom-page__group">
          <h3 className="color-custom-page__group-title">Buttons</h3>
          <div className="color-custom-page__row">
            <Button variant="primary" size="m" label="Primary M" />
            <Button variant="primary" size="s" label="Primary S" />
            <Button
              variant="primary"
              size="m"
              label="With icon"
              iconLeft={<Icon name="plus-ultra" />}
            />
            <Button variant="secondary" size="m" label="Secondary M" />
            <Button variant="secondary" size="s" label="Secondary S" />
            <Button variant="ghost" size="m" label="Ghost M" />
            <Button variant="ghost" size="s" label="Ghost S" />
          </div>
        </div>

        {/* Tabs */}
        <div className="color-custom-page__group">
          <h3 className="color-custom-page__group-title">Vertical Tabs</h3>
          <div className="color-custom-page__tabs-demo">
            <Tab size="m" label="Default tab" icon={<Icon name="home2-ultra" />} />
            <Tab size="m" label="Active tab" icon={<Icon name="search-ultra" />} isActive />
            <Tab size="m" label="With count" icon={<Icon name="list-layout-ultra" />} count={42} />
          </div>
        </div>

        {/* Nav-icon tabs (sidebar style) */}
        <div className="color-custom-page__group">
          <h3 className="color-custom-page__group-title">Sidebar Nav Tabs</h3>
          <div className="color-custom-page__nav-demo">
            <div className="color-custom-page__nav-col">
              <Tab
                size="m"
                variant="nav-icon"
                label="Overview"
                icon={<Icon name="home2-ultra" />}
                hasIconBoxBg={false}
              />
              <Tab
                size="m"
                variant="nav-icon"
                label="Search"
                icon={<Icon name="search-ultra" />}
                hasIconBoxBg={false}
                isActive
              />
              <Tab
                size="m"
                variant="nav-icon"
                label="Hiring"
                icon={<Icon name="pipelines-fill" />}
              />
              <Tab
                size="m"
                variant="nav-icon"
                label="Assessments"
                icon={<Icon name="video-fill" />}
              />
            </div>
          </div>
        </div>

        {/* Surface & border tokens */}
        <div className="color-custom-page__group">
          <h3 className="color-custom-page__group-title">Surfaces &amp; Borders</h3>
          <div className="color-custom-page__surfaces">
            <div className="color-custom-page__surface-card color-custom-page__surface-card--sidepanel">
              <span className="color-custom-page__surface-label">Side panel bg</span>
              <code>--color-surface-sidepanel-bg</code>
            </div>
            <div className="color-custom-page__surface-card color-custom-page__surface-card--highlighted">
              <span className="color-custom-page__surface-label">Card highlighted</span>
              <code>--color-surface-card-bg-highlighted</code>
            </div>
            <div className="color-custom-page__surface-card color-custom-page__surface-card--tab-active">
              <span className="color-custom-page__surface-label">Tab active</span>
              <code>--color-surface-tab-active</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Color picker card ──────────────────────────────────────────────────── */

interface ColorPickerCardProps {
  label: string;
  description: string;
  value: string;
  onChange: (hex: string) => void;
}

function ColorPickerCard({ label, description, value, onChange }: ColorPickerCardProps) {
  return (
    <div className="color-picker-card">
      <div className="color-picker-card__header">
        <h3 className="color-picker-card__title">{label}</h3>
        <p className="color-picker-card__desc">{description}</p>
      </div>

      <div className="color-picker-card__controls">
        <div className="color-picker-card__wheel">
          <HexColorPicker color={value} onChange={onChange} />
        </div>

        <div className="color-picker-card__inputs">
          <div className="color-picker-card__hex">
            <label className="color-picker-card__hex-label">HEX</label>
            <input
              type="text"
              className="color-picker-card__hex-input"
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
              }}
              onBlur={(e) => {
                const v = e.target.value;
                if (!/^#[0-9a-fA-F]{6}$/.test(v)) onChange(value);
              }}
              maxLength={7}
            />
          </div>

          {/* Swatch preview of generated shades */}
          <div className="color-picker-card__swatches">
            <span className="color-picker-card__swatch" style={{ backgroundColor: value, opacity: 0.08 }} title="8%" />
            <span className="color-picker-card__swatch" style={{ backgroundColor: value, opacity: 0.12 }} title="12%" />
            <span className="color-picker-card__swatch" style={{ backgroundColor: value, opacity: 0.16 }} title="16%" />
            <span className="color-picker-card__swatch" style={{ backgroundColor: value, opacity: 0.4 }} title="40%" />
            <span className="color-picker-card__swatch" style={{ backgroundColor: value, opacity: 0.7 }} title="70%" />
            <span className="color-picker-card__swatch" style={{ backgroundColor: value }} title="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
