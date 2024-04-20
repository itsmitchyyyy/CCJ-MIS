import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import FacilitiesPage from './FacilitiesPage';
import RequestFacilityPage from './RequestFacilityPage';
import ReportsPage from './ReportsPage';

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
    {
      path: PATHS.FACILITIES.REQUESTS,
      element: <RequestFacilityPage />,
    },
    {
      path: PATHS.FACILITIES.REPORTS,
      element: <ReportsPage />,
    },
  ],
};
