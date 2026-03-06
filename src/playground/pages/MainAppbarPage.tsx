import './MainAppbarPage.css';
import MainAppbar, {
  AppbarAction,
  AppbarAvatarGroup,
  AppbarAutomation,
} from '../../../patterns/MainAppbar/MainAppbar';
import Icon from '../../../components/Icon/Icon';

const DEMO_AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
];

export default function MainAppbarPage() {
  return (
    <div className="main-appbar-page">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, paddingBottom: 24 }}>
        <h1 style={{
          fontSize: 45,
          fontWeight: 500,
          lineHeight: '52px',
          letterSpacing: '-0.6075px',
          color: 'var(--color-neutral-neutral-1)',
          margin: 0,
        }}>Main Appbar</h1>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '-0.1px',
          color: 'var(--color-neutral-neutral-3)',
          margin: 0,
        }}>
          Top-level application bar with breadcrumb navigation and contextual controls.
          Content on the right side is dynamic and depends on the module/page context.
        </p>
      </div>

      {/* ── Full controls ─────────────────────────────────────────────── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">All controls</h2>
        </div>
        <div className="main-appbar-demo-row">
          <MainAppbar breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}>
            <AppbarAvatarGroup avatars={DEMO_AVATARS} count={8} />
            <AppbarAutomation count={3} />
            <AppbarAction
              icon={<Icon name="inbox-ultra" />}
              hasIndicator
              ariaLabel="Inbox"
            />
            <AppbarAction
              icon={<Icon name="tasks1-ultra" />}
              ariaLabel="Tasks"
            />
            <AppbarAction
              icon={<Icon name="clock-ultra" />}
              hasIndicator
              ariaLabel="Activity"
            />
            <AppbarAction
              icon={
                <img
                  className="appbar-profile-img"
                  src="https://i.pravatar.cc/40?img=5"
                  alt=""
                />
              }
              ariaLabel="Profile"
            />
          </MainAppbar>
        </div>
      </section>

      {/* ── Actions only (no avatar group, no automations) ────────────── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Actions only</h2>
        </div>
        <div className="main-appbar-demo-row">
          <MainAppbar breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}>
            <AppbarAction
              icon={<Icon name="inbox-ultra" />}
              hasIndicator
              ariaLabel="Inbox"
            />
            <AppbarAction
              icon={<Icon name="tasks1-ultra" />}
              ariaLabel="Tasks"
            />
            <AppbarAction
              icon={<Icon name="clock-ultra" />}
              ariaLabel="Activity"
            />
            <AppbarAction
              icon={
                <img
                  className="appbar-profile-img"
                  src="https://i.pravatar.cc/40?img=5"
                  alt=""
                />
              }
              ariaLabel="Profile"
            />
          </MainAppbar>
        </div>
      </section>

      {/* ── Long breadcrumbs ──────────────────────────────────────────── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Long breadcrumbs</h2>
        </div>
        <div className="main-appbar-demo-row">
          <MainAppbar
            breadcrumbs={[
              { label: 'Hiring' },
              { label: 'Pipelines' },
              { label: 'Senior Software Engineer' },
            ]}
          >
            <AppbarAction
              icon={<Icon name="inbox-ultra" />}
              ariaLabel="Inbox"
            />
            <AppbarAction
              icon={
                <img
                  className="appbar-profile-img"
                  src="https://i.pravatar.cc/40?img=5"
                  alt=""
                />
              }
              ariaLabel="Profile"
            />
          </MainAppbar>
        </div>
      </section>

      {/* ── Breadcrumbs only ──────────────────────────────────────────── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">Breadcrumbs only</h2>
        </div>
        <div className="main-appbar-demo-row">
          <MainAppbar
            breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}
          />
        </div>
      </section>

      {/* ── With automation only ──────────────────────────────────────── */}
      <section className="variant-section">
        <div className="variant-section__header">
          <h2 className="variant-section__title">With automation</h2>
        </div>
        <div className="main-appbar-demo-row">
          <MainAppbar breadcrumbs={[{ label: 'Assessments' }, { label: 'Flow Builder' }]}>
            <AppbarAutomation count={1} />
            <AppbarAction
              icon={<Icon name="inbox-ultra" />}
              ariaLabel="Inbox"
            />
            <AppbarAction
              icon={
                <img
                  className="appbar-profile-img"
                  src="https://i.pravatar.cc/40?img=5"
                  alt=""
                />
              }
              ariaLabel="Profile"
            />
          </MainAppbar>
        </div>
      </section>
    </div>
  );
}
