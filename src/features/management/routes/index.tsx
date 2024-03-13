import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import ManagementPage from './ManagementPage';
import AddSubjectPage from './AddSubjectPage';

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
    {
      path: PATHS.MANAGEMENT.CREATE_SUBJECT,
      element: <AddSubjectPage />,
    },
  ],
};
