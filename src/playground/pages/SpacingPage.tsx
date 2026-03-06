import './SpacingPage.css';

interface SpacingToken {
  name: string;       // CSS var name e.g. --spacing-sm
  key: string;        // scale key e.g. sm
  valuePx: number;    // pixel value for visual bar width
  description: string;
}

const SPACING_TOKENS: SpacingToken[] = [
  { name: '--spacing-xxsm', key: 'xxsm', valuePx: 2,  description: '2px' },
  { name: '--spacing-xsm',  key: 'xsm',  valuePx: 4,  description: '4px' },
  { name: '--spacing-sm',   key: 'sm',   valuePx: 8,  description: '8px' },
  { name: '--spacing-m',    key: 'm',    valuePx: 12, description: '12px' },
  { name: '--spacing-l',    key: 'l',    valuePx: 16, description: '16px' },
  { name: '--spacing-xl',   key: 'xl',   valuePx: 20, description: '20px' },
  { name: '--spacing-xxl',  key: 'xxl',  valuePx: 24, description: '24px' },
  { name: '--spacing-xxxl', key: 'xxxl', valuePx: 32, description: '32px' },
  { name: '--spacing-xxxxl',key: 'xxxxl',valuePx: 48, description: '48px' },
];

const MAX_PX = Math.max(...SPACING_TOKENS.map((t) => t.valuePx));

export default function SpacingPage() {
  return (
    <div className="spacing-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Spacing</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Spacing scale from <code>tokens/spacing.json</code>. Use these tokens for padding, margin, and gap.
        </p>
      </div>

      <div className="spacing-table">
        {SPACING_TOKENS.map((token) => (
          <div key={token.key} className="spacing-row">
            <span className="spacing-row__key">{token.key}</span>
            <span className="spacing-row__token">{token.name}</span>
            <div className="spacing-row__track">
              {/* inline style intentional: proportional bar width requires dynamic calculation */}
              <div
                className="spacing-row__bar"
                style={{ width: `${(token.valuePx / MAX_PX) * 100}%` }}
                aria-label={`${token.valuePx}px`}
              />
            </div>
            <span className="spacing-row__value">{token.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
