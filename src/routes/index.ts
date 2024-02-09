import { PublicAuthRoutes } from '@/features/auth/routes';
import { DashboardRoutes } from '@/features/dashboard/routes';
import { useRoutes } from 'react-router-dom';

const routes = () => {
  const authRoutes = [PublicAuthRoutes];
  return useRoutes([...authRoutes, DashboardRoutes]);
};

export default routes;
