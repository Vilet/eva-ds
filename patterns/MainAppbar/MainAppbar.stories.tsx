import MainAppbar, {
  AppbarAction,
  AppbarAvatarGroup,
  AppbarAutomation,
} from './MainAppbar';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';

const DEMO_AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
];

export default {
  title: 'Components/MainAppbar',
  component: MainAppbar,
};

export const Default = () => (
  <MainAppbar breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]} />
);

export const WithAllControls = () => (
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
);

export const ActionsOnly = () => (
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
);

export const LongBreadcrumbs = () => (
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
);

export const BreadcrumbsOnly = () => (
  <MainAppbar
    breadcrumbs={[{ label: 'Data' }, { label: 'Templates' }]}
  />
);
