import './ColorsPage.css';
import tokensCss from '../../../build/tokens.css?raw';

interface Swatch {
  name: string;
  value: string;
  description: string;
}

interface ColorGroup {
  title: string;
  swatches: Swatch[];
}

function parseColorGroups(css: string): ColorGroup[] {
  const lines = css.split('\n');
  const rawGroups: Record<string, Swatch[]> = {};

  for (const line of lines) {
    const match = line.match(/^\s+(--[\w-]+)\s*:\s*(.+?);(?:\s*\/\*\*\s*(.*?)\s*\*\/)?/);
    if (!match) continue;

    const name = match[1];
    const value = match[2].trim();
    const description = match[3] ?? '';

    if (!name.startsWith('--primitives-') && !name.startsWith('--color-')) continue;

    let group: string;
    if (name.startsWith('--primitives-primary'))           group = 'Primitives — Primary';
    else if (name.startsWith('--primitives-secondary'))    group = 'Primitives — Secondary';
    else if (name.startsWith('--primitives-neutral'))      group = 'Primitives — Neutral';
    else if (name.startsWith('--primitives-system-color')) group = 'Primitives — System Color';
    else if (name.startsWith('--primitives-chart'))        group = 'Primitives — Chart Colors';
    else if (name.startsWith('--primitives-supportive'))   group = 'Primitives — Supportive Palette';
    else if (name.startsWith('--color-interactive-primary'))   group = 'Semantic — Interactive Primary';
    else if (name.startsWith('--color-interactive-secondary')) group = 'Semantic — Interactive Secondary';
    else if (name.startsWith('--color-surface'))           group = 'Semantic — Surface';
    else if (name.startsWith('--color-neutral'))           group = 'Semantic — Neutral';
    else continue;

    if (!rawGroups[group]) rawGroups[group] = [];
    rawGroups[group].push({ name, value, description });
  }

  return Object.entries(rawGroups).map(([title, swatches]) => ({ title, swatches }));
}

const COLOR_GROUPS = parseColorGroups(tokensCss);

function Swatch({ swatch }: { swatch: Swatch }) {
  return (
    <div className="color-swatch">
      {/* inline style here is intentional: only way to display dynamic token colors */}
      <div
        className="color-swatch__chip"
        style={{ background: `var(${swatch.name})` }}
        aria-hidden="true"
      />
      <div className="color-swatch__info">
        <span className="color-swatch__token">{swatch.name}</span>
        {swatch.description && (
          <span className="color-swatch__description">{swatch.description}</span>
        )}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="colors-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Colors</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>All color tokens defined in <code>tokens/color.primitives.json</code> and <code>tokens/color.aliases.json</code>.</p>
      </div>

      {COLOR_GROUPS.map((group) => (
        <section key={group.title} className="color-section">
          <h2 className="color-section__title">{group.title}</h2>
          <div className="color-swatch-grid">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.name} swatch={swatch} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
