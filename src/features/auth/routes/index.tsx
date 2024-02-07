import { PATHS } from '@/constants/paths';
import { RouteObject, Outlet } from 'react-router-dom';
import PublicRoutes from '@/routes/PublicRoutes';
import { Login } from './Login';

export const PublicAuthRoutes: RouteObject = {
  path: PATHS.BASE,
  element: (
    <PublicRoutes>
      <Outlet />
    </PublicRoutes>
  ),
  children: [
    {
      path: PATHS.BASE,
      element: <Login />,
    },
    {
      path: PATHS.AUTH.LOGIN,
      element: <Login />,
    },
  ],
};
