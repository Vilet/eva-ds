import './ShadowsPage.css';

interface ShadowToken {
  name: string;
  key: string;
  description: string;
}

const SHADOW_TOKENS: ShadowToken[] = [
  { name: '--shadow-elev-1', key: 'elev-1', description: 'Subtle elevation — cards, primary buttons' },
  { name: '--shadow-elev-2', key: 'elev-2', description: 'AI agent composer block' },
  { name: '--shadow-elev-3', key: 'elev-3', description: 'Drawers, popovers, dropdown menus' },
  { name: '--shadow-elev-4', key: 'elev-4', description: 'Modal dialogs — strongest elevation' },
  { name: '--shadow-elev-red',  key: 'elev-red',  description: 'Error state border glow (inputs)' },
  { name: '--shadow-elev-blue', key: 'elev-blue', description: 'Active state border glow (inputs, themed)' },
];

export default function ShadowsPage() {
  return (
    <div className="shadows-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Shadows</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Elevation shadows from <code>tokens/shadows.json</code>. Used to communicate depth and focus.
        </p>
      </div>

      <div className="shadow-grid">
        {SHADOW_TOKENS.map((token) => (
          <div key={token.key} className="shadow-tile">
            {/* inline style intentional: only way to apply each shadow token dynamically */}
            <div
              className="shadow-tile__box"
              style={{ boxShadow: `var(${token.name})` }}
              aria-label={`Shadow: ${token.key}`}
            />
            <div className="shadow-tile__info">
              <span className="shadow-tile__key">{token.key}</span>
              <span className="shadow-tile__token">{token.name}</span>
              <span className="shadow-tile__description">{token.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
