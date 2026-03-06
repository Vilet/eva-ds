import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import ColorsPage from './pages/ColorsPage';
import SpacingPage from './pages/SpacingPage';
import RadiusPage from './pages/RadiusPage';
import ShadowsPage from './pages/ShadowsPage';
import ButtonPage from './pages/ButtonPage';
import VerticalTabPage from './pages/VerticalTabPage';
import MainSidebarPage from './pages/MainSidebarPage';
import SecondaryNavPage from './pages/SecondaryNavPage';
import MainAppbarPage from './pages/MainAppbarPage';
import ListRecordPage from './pages/ListRecordPage';
import ContentToolbarPage from './pages/ContentToolbarPage';
import LinkedInSearchPage from './pages/LinkedInSearchPage';
import ColorCustomizationPage from './pages/ColorCustomizationPage';

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  children?: NavItem[];
}

export const NAV_CONFIG: NavItem[] = [
  { id: 'overview', label: 'Overview', path: '/' },
  {
    id: 'tokens',
    label: 'Tokens',
    children: [
      { id: 'colors',  label: 'Colors',  path: '/tokens/colors' },
      { id: 'spacing', label: 'Spacing', path: '/tokens/spacing' },
      { id: 'radius',  label: 'Radius',  path: '/tokens/radius' },
      { id: 'shadows', label: 'Shadows', path: '/tokens/shadows' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'button',       label: 'Button',       path: '/components/button' },
      { id: 'vertical-tab', label: 'Vertical Tab', path: '/components/vertical-tab' },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    children: [
      { id: 'main-sidebar',   label: 'Main Sidebar',   path: '/patterns/main-sidebar' },
      { id: 'secondary-nav',  label: 'Secondary Nav',  path: '/patterns/secondary-nav' },
      { id: 'main-appbar',    label: 'Main Appbar',    path: '/patterns/main-appbar' },
      { id: 'list-record',    label: 'List Record',    path: '/patterns/list-record' },
      { id: 'content-toolbar', label: 'Content Toolbar', path: '/patterns/content-toolbar' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    children: [
      { id: 'linkedin-search', label: 'LinkedIn Search', path: '/pages/linkedin-search' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    children: [
      { id: 'color-customization', label: 'Color Customization', path: '/tools/color-customization' },
    ],
  },
];

export interface RouteConfig {
  path: string;
  element: ReactElement;
}

function collectRoutes(items: NavItem[]): RouteConfig[] {
  const routes: RouteConfig[] = [];
  for (const item of items) {
    if (item.path) {
      let element: ReactElement;
      switch (item.id) {
        case 'overview':  element = <OverviewPage />; break;
        case 'colors':    element = <ColorsPage />;   break;
        case 'spacing':   element = <SpacingPage />;  break;
        case 'radius':    element = <RadiusPage />;   break;
        case 'shadows':   element = <ShadowsPage />;  break;
        case 'button':       element = <ButtonPage />;      break;
        case 'vertical-tab': element = <VerticalTabPage />; break;
        case 'main-sidebar':   element = <MainSidebarPage />;  break;
        case 'secondary-nav':  element = <SecondaryNavPage />; break;
        case 'main-appbar':    element = <MainAppbarPage />;  break;
        case 'list-record':    element = <ListRecordPage />;  break;
        case 'content-toolbar': element = <ContentToolbarPage />; break;
        case 'linkedin-search': element = <LinkedInSearchPage />; break;
        case 'color-customization': element = <ColorCustomizationPage />; break;
        default: element = <Navigate to="/" replace />;
      }
      routes.push({ path: item.path, element });
    }
    if (item.children?.length) {
      routes.push(...collectRoutes(item.children));
    }
  }
  return routes;
}

export const ROUTES: RouteConfig[] = collectRoutes(NAV_CONFIG);
