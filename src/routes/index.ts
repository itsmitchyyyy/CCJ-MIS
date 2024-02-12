import { PublicAuthRoutes } from '@/features/auth/routes';
import { DashboardRoutes } from '@/features/dashboard/routes';
import { ProfileRoutes } from '@/features/profile/routes';
import { useRoutes } from 'react-router-dom';

const routes = () => {
  const authRoutes = [PublicAuthRoutes];
  return useRoutes([...authRoutes, DashboardRoutes, ProfileRoutes]);
};

export default routes;
