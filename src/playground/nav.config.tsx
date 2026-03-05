import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import ColorsPage from './pages/ColorsPage';
import SpacingPage from './pages/SpacingPage';
import RadiusPage from './pages/RadiusPage';
import ShadowsPage from './pages/ShadowsPage';
import ButtonPage from './pages/ButtonPage';
import VerticalTabPage from './pages/VerticalTabPage';

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
