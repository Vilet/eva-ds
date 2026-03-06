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
      <h1 className="page-title">Main Appbar</h1>
      <p className="page-subtitle">
        Top-level application bar with breadcrumb navigation and contextual controls.
        Content on the right side is dynamic and depends on the module/page context.
      </p>

      {/* ── Full controls ─────────────────────────────────────────────── */}
      <section className="variant-section">
        <h2 className="variant-section__title">All controls</h2>
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
        <h2 className="variant-section__title">Actions only</h2>
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
        <h2 className="variant-section__title">Long breadcrumbs</h2>
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
        <h2 className="variant-section__title">Breadcrumbs only</h2>
        <div className="main-appbar-demo-row">
          <MainAppbar
            breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}
          />
        </div>
      </section>

      {/* ── With automation only ──────────────────────────────────────── */}
      <section className="variant-section">
        <h2 className="variant-section__title">With automation</h2>
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
