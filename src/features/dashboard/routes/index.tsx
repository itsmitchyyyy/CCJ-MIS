import { PATHS } from '@/constants/paths';
import { RouteObject, Outlet } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

export const DashboardRoutes: RouteObject = {
  path: PATHS.DASHBOARD.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <Dashboard />,
    },
  ],
};
