import { PublicAuthRoutes } from '@/features/auth/routes';
import { useRoutes } from 'react-router-dom';

const routes = () => {
  const authRoutes = [PublicAuthRoutes];
  return useRoutes([...authRoutes]);
};

export default routes;
