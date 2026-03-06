import './ListRecordPage.css';
import ListRecord from '../../../patterns/ListRecord/ListRecord';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';

function DemoIcon({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <div className={`demo-icon-32 demo-icon-32--${variant}`}>
      <Icon name={variant === 'primary' ? 'in-fil' : 'briefcase-fill'} />
    </div>
  );
}

function ActionButtons() {
  return (
    <>
      <Button
        variant="wrapped"
        size="xs"
        iconLeft={<Icon name="arrow-up-right-ultra" />}
        ariaLabel="Open"
      />
      <Button
        variant="wrapped"
        size="xs"
        iconLeft={<Icon name="more-horizontal" />}
        ariaLabel="More options"
      />
    </>
  );
}

export default function ListRecordPage() {
  return (
    <div className="list-record-page">
      <h1 className="page-title">List Record</h1>
      <p className="page-subtitle">
        Alternative data-view style for table records. Hover to see floating actions.
      </p>

      <section className="variant-section">
        <h2 className="variant-section__title">LinkedIn project context</h2>
        <div className="list-record-demo-row">
        {/* Default */}
        <ListRecord
          leadingIcon={<DemoIcon variant="primary" />}
          title="HR Generalist, Jordan, Amman"
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Last synced on 11 Mar, 17:14</span>
          <span className="demo-badge demo-badge--outlined">
            <Icon name="refresh-ultra" />
            Every 2 days
          </span>
          <span className="demo-meta-text demo-meta-text--dark">Gustavo Nicolas</span>
          <span className="demo-badge demo-badge--filled">12 profiles</span>
        </ListRecord>

        {/* Selected */}
        <ListRecord
          leadingIcon={<DemoIcon variant="primary" />}
          title="HR Generalist, Jordan, Amman"
          selected
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Last synced on 11 Mar, 17:14</span>
          <span className="demo-badge demo-badge--outlined">
            <Icon name="refresh-ultra" />
            Every 2 days
          </span>
          <span className="demo-meta-text demo-meta-text--dark">Gustavo Nicolas</span>
          <span className="demo-badge demo-badge--filled">12 profiles</span>
        </ListRecord>
      </div>
      </section>

      <section className="variant-section">
        <h2 className="variant-section__title">Position context</h2>
        <div className="list-record-demo-row">
        <ListRecord
          leadingIcon={<DemoIcon variant="secondary" />}
          title="Node.JS dev, London, Urgent"
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Applied on 11 Mar, 17:14</span>
          <span className="demo-meta-text">
            <Icon name="paperclip-ultra" /> 4
          </span>
          <span className="demo-badge demo-badge--filled">
            <Icon name="indicator-dot" />
            Applied
          </span>
          <span className="demo-badge demo-badge--filled">68%</span>
        </ListRecord>

        <ListRecord
          leadingIcon={<DemoIcon variant="secondary" />}
          title="Senior React Developer, Remote, Full-time — Very Long Title That Should Truncate With Milk Fade Effect"
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Applied on 11 Mar, 17:14</span>
          <span className="demo-badge demo-badge--filled">
            <Icon name="indicator-dot" />
            Interview
          </span>
          <span className="demo-badge demo-badge--filled">92%</span>
        </ListRecord>

        <ListRecord
          leadingIcon={<DemoIcon variant="secondary" />}
          title="Node.JS dev, London, Urgent"
          selected
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Applied on 11 Mar, 17:14</span>
          <span className="demo-meta-text">
            <Icon name="paperclip-ultra" /> 4
          </span>
          <span className="demo-badge demo-badge--filled">
            <Icon name="indicator-dot" />
            Applied
          </span>
          <span className="demo-badge demo-badge--filled">68%</span>
        </ListRecord>
      </div>
      </section>

      <section className="variant-section">
        <h2 className="variant-section__title">Without leading icon</h2>
        <div className="list-record-demo-row">
        <ListRecord
          title="Simple record without an icon"
          actions={<ActionButtons />}
        >
          <span className="demo-meta-text">Some metadata</span>
          <span className="demo-badge demo-badge--filled">Tag</span>
        </ListRecord>
      </div>
      </section>
    </div>
  );
}
