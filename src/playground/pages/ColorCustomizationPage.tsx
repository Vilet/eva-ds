import { useState, useMemo, type CSSProperties } from 'react';
import { HexColorPicker } from 'react-colorful';
import './ColorCustomizationPage.css';
import './MailboxPreview.css';
import MailboxPreview from './MailboxPreview';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: 'var(--color-interactive-secondary-bg-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C10 2 4 9 4 13a6 6 0 0 0 12 0c0-4-6-11-6-11Z" fill="var(--color-neutral-neutral-1)" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 45,
            fontWeight: 500,
            lineHeight: '52px',
            letterSpacing: '-0.6075px',
            color: 'var(--color-neutral-neutral-1)',
            margin: 0,
          }}>Color customization</h1>
        </div>
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

      {/* ── Preview with floating picker cards ─────────────────────── */}
      <div className="color-custom-page__body">
        <div className="color-custom-page__preview-frame" style={overrides}>
          <MailboxPreview />
        </div>

        {/* Floating color picker cards */}
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
