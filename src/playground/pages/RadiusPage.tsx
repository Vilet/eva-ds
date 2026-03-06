import './RadiusPage.css';

interface RadiusToken {
  name: string;
  key: string;
  valuePx: number;
  description: string;
}

const RADIUS_TOKENS: RadiusToken[] = [
  { name: '--radius-xxs', key: 'xxs', valuePx: 4,  description: 'Chips, tags, small UI elements' },
  { name: '--radius-xs',  key: 'xs',  valuePx: 6,  description: 'Small interactive elements' },
  { name: '--radius-s',   key: 's',   valuePx: 8,  description: 'Buttons, inputs' },
  { name: '--radius-m',   key: 'm',   valuePx: 10, description: 'Cards, containers' },
  { name: '--radius-l',   key: 'l',   valuePx: 12, description: 'Large cards' },
  { name: '--radius-xl',  key: 'xl',  valuePx: 16, description: 'Modals, panels' },
  { name: '--radius-xxl', key: 'xxl', valuePx: 24, description: 'Floating surfaces, tooltips' },
];

export default function RadiusPage() {
  return (
    <div className="radius-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Radius</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Border radius scale from <code>tokens/radius.json</code>.
        </p>
      </div>

      <div className="radius-grid">
        {RADIUS_TOKENS.map((token) => (
          <div key={token.key} className="radius-tile">
            {/* inline style intentional: displaying each token's own border-radius */}
            <div
              className="radius-tile__box"
              style={{ borderRadius: `var(${token.name})` }}
              aria-label={`${token.valuePx}px radius`}
            />
            <div className="radius-tile__info">
              <span className="radius-tile__key">{token.key}</span>
              <span className="radius-tile__token">{token.name}</span>
              <span className="radius-tile__value">{token.valuePx}px</span>
              <span className="radius-tile__description">{token.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
