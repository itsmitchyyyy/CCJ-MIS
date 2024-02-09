import { PATHS } from '@/constants/paths';
import { RouteObject, Outlet } from 'react-router-dom';
import PublicRoutes from '@/routes/PublicRoutes';
import { Dashboard } from './Dashboard';

export const DashboardRoutes: RouteObject = {
  path: PATHS.BASE,
  element: (
    <PublicRoutes>
      <Outlet />
    </PublicRoutes>
  ),
  children: [
    {
      path: PATHS.DASHBOARD.BASE,
      element: <Dashboard />,
    },
  ],
};
