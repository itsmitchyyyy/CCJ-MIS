import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import AnnouncementPage from './AnnouncementPage';

export const AnnouncementsRoutes: RouteObject = {
  path: PATHS.ANNOUCEMENTS.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <AnnouncementPage />,
    },
  ],
};
