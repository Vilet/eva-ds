import './ComponentsPage.css';

export default function ComponentsPage() {
  return (
    <div className="components-page">
      <h1 className="page-title">Components</h1>
      <p className="page-subtitle">
        Components will appear here as they are added to the design system.
      </p>

      <div className="components-empty">
        <p className="components-empty__message">No components yet.</p>
        <p className="components-empty__hint">
          Add a component and register it in <code>nav.config.tsx</code> to make it appear in the sidebar.
        </p>
      </div>
    </div>
  );
}
