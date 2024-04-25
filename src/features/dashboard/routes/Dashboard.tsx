import { AdminLayout } from '@/components/Layout';
import { DashboardDetails } from '../components/DashboardDetails';
import { useFetchAnnouncements } from '@/features/announcement/api/fetchAnnouncements';
import { useFetchSetting } from '../api/fetchSetting';
import { useCreateSettings } from '../api/createSettings';

export const Dashboard = () => {
  const { data: announcements = [], isLoading } = useFetchAnnouncements();
  const {
    data: setting = { id: '', mission: '', vision: '' },
    isLoading: isLoadingSetting,
  } = useFetchSetting();

  const { mutate: createSettings, isPending, isSuccess } = useCreateSettings();

  return (
    <AdminLayout>
      <DashboardDetails
        announcements={announcements}
        isFetchingAnnouncements={isLoading}
        setting={setting}
        isLoadingSetting={isLoadingSetting}
        onSubmitSetting={createSettings}
        isSubmittingSetting={isPending}
        isSuccessfullySubmittedSetting={isSuccess}
      />
    </AdminLayout>
  );
};
