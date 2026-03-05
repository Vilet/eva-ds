import './OverviewPage.css';
import tokensCss from '../../../build/tokens.css?raw';

interface TokenGroup {
  label: string;
  tokens: string[];
}

function parseTokenGroups(css: string): TokenGroup[] {
  const lines = css.split('\n');
  const groups: Record<string, string[]> = {};

  for (const line of lines) {
    const match = line.match(/^\s+(--[\w-]+)\s*:/);
    if (!match) continue;
    const name = match[1];

    let group: string;
    if (name.startsWith('--primitives-primary'))          group = 'primitives-primary';
    else if (name.startsWith('--primitives-secondary'))   group = 'primitives-secondary';
    else if (name.startsWith('--primitives-neutral'))     group = 'primitives-neutral';
    else if (name.startsWith('--primitives-system-color')) group = 'primitives-system-color';
    else if (name.startsWith('--primitives-chart'))       group = 'primitives-chart-colors';
    else if (name.startsWith('--primitives-supportive'))  group = 'primitives-supportive-palette';
    else if (name.startsWith('--color-interactive-primary')) group = 'color-interactive-primary';
    else if (name.startsWith('--color-interactive-secondary')) group = 'color-interactive-secondary';
    else if (name.startsWith('--color-surface'))          group = 'color-surface';
    else if (name.startsWith('--color-neutral'))          group = 'color-neutral';
    else if (name.startsWith('--spacing'))                group = 'spacing';
    else if (name.startsWith('--radius'))                 group = 'radius';
    else if (name.startsWith('--shadow'))                 group = 'shadows';
    else                                                  group = 'other';

    if (!groups[group]) groups[group] = [];
    groups[group].push(name);
  }

  const LABELS: Record<string, string> = {
    'primitives-primary':            'Primitives — Primary',
    'primitives-secondary':          'Primitives — Secondary',
    'primitives-neutral':            'Primitives — Neutral',
    'primitives-system-color':       'Primitives — System Color',
    'primitives-chart-colors':       'Primitives — Chart Colors',
    'primitives-supportive-palette': 'Primitives — Supportive Palette',
    'color-interactive-primary':     'Semantic — Interactive Primary',
    'color-interactive-secondary':   'Semantic — Interactive Secondary',
    'color-surface':                 'Semantic — Surface',
    'color-neutral':                 'Semantic — Neutral',
    'spacing':                       'Spacing',
    'radius':                        'Radius',
    'shadows':                       'Shadows',
    'other':                         'Other',
  };

  return Object.entries(groups)
    .filter(([, tokens]) => tokens.length > 0)
    .map(([key, tokens]) => ({
      label: LABELS[key] ?? key,
      tokens,
    }));
}

const TOKEN_GROUPS = parseTokenGroups(tokensCss);
const TOTAL_TOKENS = TOKEN_GROUPS.reduce((sum, g) => sum + g.tokens.length, 0);

export default function OverviewPage() {
  return (
    <div className="overview-page">
      <header className="overview-header">
        <h1 className="overview-header__title">Elevatus Design System</h1>
        <p className="overview-header__subtitle">Component playground</p>
      </header>

      <section className="overview-summary">
        <div className="overview-summary__meta">
          <span className="overview-summary__total">
            {TOTAL_TOKENS} CSS custom properties
          </span>
          <span className="overview-summary__hint">
            from <code>build/tokens.css</code>
          </span>
        </div>

        <ul className="token-group-list" role="list">
          {TOKEN_GROUPS.map((group) => (
            <li key={group.label} className="token-group-row">
              <span className="token-group-row__label">{group.label}</span>
              <span className="token-group-row__count">{group.tokens.length}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
