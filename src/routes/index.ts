import { AccountRoutes } from '@/features/account/routes';
import { PublicAuthRoutes } from '@/features/auth/routes';
import { DashboardRoutes } from '@/features/dashboard/routes';
import { ProfileRoutes } from '@/features/profile/routes';
import { useRoutes } from 'react-router-dom';

const routes = () =>
  useRoutes([PublicAuthRoutes, DashboardRoutes, ProfileRoutes, AccountRoutes]);

export default routes;
