import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import AccountPage from './AccountPage';
import CreateAccountPage from './CreateAccountPage';

export const AccountRoutes: RouteObject = {
  path: PATHS.ACCOUNT.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <AccountPage />,
    },
    {
      path: PATHS.ACCOUNT.CREATE,
      element: <CreateAccountPage />,
    },
  ],
};
