import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ForgotPasswordPage from './ForgotPasswordPage';
import PublicRoutes from '@/routes/PublicRoutes';

export const ForgotPasswordRoutes: RouteObject = {
  path: PATHS.FORGOT_PASSWORD.BASE,
  element: (
    <PublicRoutes>
      <Outlet />
    </PublicRoutes>
  ),
  children: [
    {
      path: '',
      element: <ForgotPasswordPage />,
    },
  ],
};
