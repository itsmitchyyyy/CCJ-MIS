import { PATHS } from '@/constants/paths';
import PublicRoutes from '@/routes/PublicRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import ProfilePage from './ProfilePage';

export const ProfileRoutes: RouteObject = {
  path: PATHS.PROFILE.BASE,
  element: (
    <PublicRoutes>
      <Outlet />
    </PublicRoutes>
  ),
  children: [
    {
      path: '',
      element: <ProfilePage />,
    },
  ],
};
