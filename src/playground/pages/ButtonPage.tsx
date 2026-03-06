import { useState, type ReactNode } from 'react';
import './ButtonPage.css';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';

// ── Toggle switch ──────────────────────────────────────────────────────────

interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <label htmlFor={id} className="pg-toggle">
      <input
        id={id}
        type="checkbox"
        className="pg-toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="pg-toggle__track" aria-hidden="true" />
      <span className="pg-toggle__label">{label}</span>
    </label>
  );
}

// ── Controls bar ───────────────────────────────────────────────────────────

interface ControlsBarProps {
  showIconLeft: boolean;
  showIconRight: boolean;
  onChangeIconLeft: (v: boolean) => void;
  onChangeIconRight: (v: boolean) => void;
}

function ControlsBar({ showIconLeft, showIconRight, onChangeIconLeft, onChangeIconRight }: ControlsBarProps) {
  return (
    <div className="controls-bar" role="group" aria-label="Button preview controls">
      <span className="controls-bar__label">Controls</span>
      <div className="controls-bar__toggles">
        <Toggle
          id="ctrl-icon-left"
          label="Leading icon"
          checked={showIconLeft}
          onChange={onChangeIconLeft}
        />
        <Toggle
          id="ctrl-icon-right"
          label="Trailing icon"
          checked={showIconRight}
          onChange={onChangeIconRight}
        />
      </div>
      <span className="controls-bar__hint">
        Applies to all labeled buttons below
      </span>
    </div>
  );
}

// ── States matrix ──────────────────────────────────────────────────────────

interface StatesDemoProps {
  variant: 'primary' | 'secondary' | 'ghost';
  sizes: ('m' | 's' | 'xs' | 'xxs')[];
  iconLeft: ReactNode;
  iconRight: ReactNode;
}

function StatesMatrix({ variant, sizes, iconLeft, iconRight }: StatesDemoProps) {
  return (
    <div className="states-matrix">
      <div className="states-matrix__header">
        <span className="states-matrix__col-label" />
        <span className="states-matrix__col-label">Default</span>
        <span className="states-matrix__col-label">Hover</span>
        <span className="states-matrix__col-label">Active</span>
        <span className="states-matrix__col-label">Disabled</span>
        <span className="states-matrix__col-label">Loading</span>
        <span className="states-matrix__col-label">Icon only</span>
      </div>

      {sizes.map((size) => (
        <div key={size} className="states-matrix__row">
          <span className="states-matrix__size-label">{size.toUpperCase()} size</span>

          {/* Default */}
          <div className="states-matrix__cell">
            <Button variant={variant} size={size} label="Button"
              iconLeft={iconLeft} iconRight={iconRight} />
          </div>

          {/* Hover — forced via CSS class on wrapper */}
          <div className="states-matrix__cell">
            <div className="demo-force-hover">
              <Button variant={variant} size={size} label="Button"
                iconLeft={iconLeft} iconRight={iconRight} />
            </div>
          </div>

          {/* Active — forced via CSS class on wrapper */}
          <div className="states-matrix__cell">
            <div className="demo-force-active">
              <Button variant={variant} size={size} label="Button"
                iconLeft={iconLeft} iconRight={iconRight} />
            </div>
          </div>

          {/* Disabled */}
          <div className="states-matrix__cell">
            <Button variant={variant} size={size} label="Button"
              iconLeft={iconLeft} disabled />
          </div>

          {/* Loading */}
          <div className="states-matrix__cell">
            <Button variant={variant} size={size} label="Button" loading />
          </div>

          {/* Icon-only — always shows icon, unaffected by controls */}
          <div className="states-matrix__cell">
            <Button variant={variant} size={size} iconLeft={<Icon name="plus-ultra" />} ariaLabel="Add item" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ButtonPage() {
  const [showIconLeft,  setShowIconLeft]  = useState(true);
  const [showIconRight, setShowIconRight] = useState(true);

  const iconLeft  = showIconLeft  ? <Icon name="plus-ultra" />         : undefined;
  const iconRight = showIconRight ? <Icon name="chevron-down-ultra" /> : undefined;

  return (
    <div className="button-page">
      {/* ── Page header ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Buttons</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Page description...The toolbar appears on almost every page, it is located usually right below the page title component and appears above the page content like data table or other content display style. The number of controls on the right side may vary depending on the context.
        </p>
      </div>

      {/* ── Primary ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Primary</h2>
          <p className="variant-section__desc">
            Page description...The toolbar appears on almost every page, it is located usually right below the page title component and appears above the page
          </p>
        </div>
        <StatesMatrix variant="primary" sizes={['m', 's']} iconLeft={iconLeft} iconRight={iconRight} />
      </section>

      {/* ── Secondary ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Secondary</h2>
          <p className="variant-section__desc">
            Page description...The toolbar appears on almost every page, it is located usually right below the page title component and appears above the page
          </p>
        </div>
        <StatesMatrix variant="secondary" sizes={['m', 's', 'xs']} iconLeft={iconLeft} iconRight={iconRight} />
      </section>

      {/* ── Ghost ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Ghost</h2>
          <p className="variant-section__desc">No fill, no border. Sizes M, S, XS, XXS. Use XXS for breadcrumbs only.</p>
        </div>
        <StatesMatrix variant="ghost" sizes={['m', 's', 'xs', 'xxs']} iconLeft={iconLeft} iconRight={iconRight} />
      </section>

      {/* ── Solo-floating ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Solo-floating</h2>
          <p className="variant-section__desc">
            Elevated icon-only button — always icon-only, unaffected by controls.
            Appears on card hover. Sizes S and XS. No disabled or loading states.
          </p>
        </div>
        <div className="solo-floating-demo">
          <div className="solo-floating-demo__group">
            <span className="demo-label">S — Default</span>
            <Button variant="solo-floating" size="s" iconLeft={<Icon name="plus-ultra" />} ariaLabel="Add item" />
          </div>
          <div className="solo-floating-demo__group">
            <span className="demo-label">XS — Default</span>
            <Button variant="solo-floating" size="xs" iconLeft={<Icon name="plus-ultra" />} ariaLabel="Add item" />
          </div>
          <div className="solo-floating-demo__group demo-force-hover">
            <span className="demo-label">S — Hover ↕</span>
            <Button variant="solo-floating" size="s" iconLeft={<Icon name="plus-ultra" />} ariaLabel="Add item" />
          </div>
          <div className="solo-floating-demo__group demo-force-active">
            <span className="demo-label">S — Active ↕</span>
            <Button variant="solo-floating" size="s" iconLeft={<Icon name="plus-ultra" />} ariaLabel="Add item" />
          </div>
        </div>
      </section>

      {/* ── Wrapped ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Wrapped (ButtonBar)</h2>
          <p className="variant-section__desc">
            Icon-only buttons inside an elevated bar — always icon-only, unaffected by controls.
            Appears on card/table row hover. The elevation is on the container. Sizes S, XS, XXS.
          </p>
        </div>
        <div className="buttonbar-demo">
          <div className="buttonbar-demo__label">S size bar</div>
          <div className="btn-bar">
            <Button variant="wrapped" size="s" iconLeft={<Icon name="edit-ultra" />} ariaLabel="Edit" />
            <Button variant="wrapped" size="s" iconLeft={<Icon name="more-horizontal" />} ariaLabel="More options" />
          </div>

          <div className="buttonbar-demo__label">XS size bar</div>
          <div className="btn-bar">
            <Button variant="wrapped" size="xs" iconLeft={<Icon name="edit-ultra" />} ariaLabel="Edit" />
            <Button variant="wrapped" size="xs" iconLeft={<Icon name="more-horizontal" />} ariaLabel="More options" />
          </div>

          <div className="buttonbar-demo__label">XXS size bar</div>
          <div className="btn-bar">
            <Button variant="wrapped" size="xxs" iconLeft={<Icon name="edit-ultra" />} ariaLabel="Edit" />
            <Button variant="wrapped" size="xxs" iconLeft={<Icon name="more-horizontal" />} ariaLabel="More options" />
          </div>
        </div>
      </section>

      {/* ── Focus-visible ── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Focus-visible</h2>
          <p className="variant-section__desc">
            Tab to these buttons to see the focus ring (<code>--shadow-elev-blue</code>).
          </p>
        </div>
        <div className="focus-demo">
          <Button variant="primary"       size="m" label="Tab to me" iconLeft={iconLeft} />
          <Button variant="secondary"     size="m" label="Tab to me" iconLeft={iconLeft} />
          <Button variant="ghost"         size="m" label="Tab to me" iconLeft={iconLeft} />
          <Button variant="solo-floating" size="s" iconLeft={<Icon name="plus-ultra" />} ariaLabel="Tab to me" />
        </div>
      </section>

      {/* ── Sticky bottom controls panel ── */}
      <ControlsBar
        showIconLeft={showIconLeft}
        showIconRight={showIconRight}
        onChangeIconLeft={setShowIconLeft}
        onChangeIconRight={setShowIconRight}
      />
    </div>
  );
}
