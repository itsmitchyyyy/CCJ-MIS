import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

export const ProfileRoutes: RouteObject = {
  path: PATHS.PROFILE.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <ProfilePage />,
    },
  ],
};
