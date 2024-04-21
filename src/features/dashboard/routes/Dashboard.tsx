import { AdminLayout } from '@/components/Layout';
import { DashboardDetails } from '../components/DashboardDetails';
import { useFetchAnnouncements } from '@/features/announcement/api/fetchAnnouncements';

export const Dashboard = () => {
  const { data: announcements = [], isLoading } = useFetchAnnouncements();

  return (
    <AdminLayout>
      <DashboardDetails
        announcements={announcements}
        isFetchingAnnouncements={isLoading}
      />
    </AdminLayout>
  );
};
