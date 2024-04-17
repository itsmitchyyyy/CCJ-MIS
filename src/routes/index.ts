import { AccountRoutes } from '@/features/account/routes';
import { PublicAuthRoutes } from '@/features/auth/routes';
import { DashboardRoutes } from '@/features/dashboard/routes';
import { DocumentsRoutes } from '@/features/documents/routes';
import { FacilitiesRoutes } from '@/features/facilities/routes';
import { ManagementRoutes } from '@/features/management/routes';
import { ProfileRoutes } from '@/features/profile/routes';
import { useRoutes } from 'react-router-dom';

const routes = () =>
  useRoutes([
    PublicAuthRoutes,
    DashboardRoutes,
    ProfileRoutes,
    AccountRoutes,
    ManagementRoutes,
    DocumentsRoutes,
    FacilitiesRoutes,
  ]);

export default routes;
