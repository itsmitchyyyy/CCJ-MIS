import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import FacilitiesPage from './FacilitiesPage';

export const FacilitiesRoutes: RouteObject = {
  path: PATHS.FACILITIES.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <FacilitiesPage />,
    },
  ],
};
