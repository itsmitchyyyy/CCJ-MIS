import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import ManagementPage from './ManagementPage';

export const ManagementRoutes: RouteObject = {
  path: PATHS.MANAGEMENT.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <ManagementPage />,
    },
  ],
};
