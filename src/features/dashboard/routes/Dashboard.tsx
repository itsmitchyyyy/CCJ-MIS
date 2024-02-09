import { AdminLayout } from '@/components/Layout';
import { DashboardDetails } from '../components/DashboardDetails';

export const Dashboard = () => {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <DashboardDetails />
    </AdminLayout>
  );
};
