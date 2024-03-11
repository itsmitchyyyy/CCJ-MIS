import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import AccountPage from './AccountPage';
import CreateAccountPage from './CreateAccountPage';
import UpdateAccountPage from './UpdateAccountPage';
import { AccessLayout } from '@/components/Layout';
import { AccessType } from '../types';

export const AccountRoutes: RouteObject = {
  path: PATHS.ACCOUNT.BASE,
  element: (
    <ProtectedRoutes>
      <AccessLayout access_type={AccessType.Admin}>
        <Outlet />
      </AccessLayout>
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
    {
      path: PATHS.ACCOUNT.UPDATE,
      element: <UpdateAccountPage />,
    },
  ],
};
