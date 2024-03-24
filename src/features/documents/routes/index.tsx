import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import OfficeDocumentsPage from './OfficeDocumentsPage';

export const DocumentsRoutes: RouteObject = {
  path: PATHS.DOCUMENTS.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <OfficeDocumentsPage />,
    },
  ],
};
