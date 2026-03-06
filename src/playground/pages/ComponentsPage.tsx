import './ComponentsPage.css';

export default function ComponentsPage() {
  return (
    <div className="components-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Components</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Components will appear here as they are added to the design system.
        </p>
      </div>

      <div className="components-empty">
        <p className="components-empty__message">No components yet.</p>
        <p className="components-empty__hint">
          Add a component and register it in <code>nav.config.tsx</code> to make it appear in the sidebar.
        </p>
      </div>
    </div>
  );
}
