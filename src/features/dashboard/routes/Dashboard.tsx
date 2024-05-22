import { AdminLayout } from '@/components/Layout';
import { DashboardDetails } from '../components/DashboardDetails';
import { useFetchAnnouncements } from '@/features/announcement/api/fetchAnnouncements';
import { useFetchSetting } from '../api/fetchSetting';
import { useCreateSettings } from '../api/createSettings';
import { useCreateAnnouncement } from '@/features/announcement/api/createAnnouncement';
import { useDeleteAnnouncement } from '@/features/announcement/api/deleteAnnouncement';
import { useGlobalState } from '@/hooks/global';
import { AnnouncementType } from '@/features/announcement/types';

export const Dashboard = () => {
  const {
    useAuth: { accessType },
  } = useGlobalState();
  const { data: announcements = [], isLoading } = useFetchAnnouncements({
    type: accessType === 'admin' ? undefined : (accessType as AnnouncementType),
  });
  const {
    data: setting = { id: '', mission: '', vision: '' },
    isLoading: isLoadingSetting,
  } = useFetchSetting();

  const { mutate: createSettings, isPending, isSuccess } = useCreateSettings();
  const {
    mutate: createAnnouncement,
    isPending: isPendingCreateAnnouncement,
    isSuccess: isSuccessCreateAnnouncement,
  } = useCreateAnnouncement();
  const { mutate: deleteAnnouncement, isPending: isDeletingAnnouncement } =
    useDeleteAnnouncement();

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
        onDeleteAnnouncement={deleteAnnouncement}
        onCreateAnnouncement={createAnnouncement}
        isCreatingAnnouncement={isPendingCreateAnnouncement}
        isSuccessfullyCreated={isSuccessCreateAnnouncement}
        isDeletingAnnouncement={isDeletingAnnouncement}
      />
    </AdminLayout>
  );
};
