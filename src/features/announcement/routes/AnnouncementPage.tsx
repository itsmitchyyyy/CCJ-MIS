import { AdminLayout } from '@/components/Layout';
import Announcement from '../components/Announcement';
import { useCreateAnnouncement } from '../api/createAnnouncement';
import { useFetchAnnouncements } from '../api/fetchAnnouncements';
import { useDeleteAnnouncement } from '../api/deleteAnnouncement';

const AnnouncementPage = () => {
  const { data: announcements = [], isLoading } = useFetchAnnouncements();
  const {
    mutate: createAnnouncement,
    isPending,
    isSuccess,
  } = useCreateAnnouncement();
  const { mutate: deleteAnnouncement, isPending: isDeleting } =
    useDeleteAnnouncement();

  return (
    <AdminLayout>
      <Announcement
        onDeleteAnnouncement={deleteAnnouncement}
        onCreateAnnouncement={createAnnouncement}
        isCreatingAnnouncement={isPending}
        isSuccessfullyCreated={isSuccess}
        isFetchingAnnouncements={isLoading}
        isDeletingAnnouncement={isDeleting}
        announcements={announcements}
      />
    </AdminLayout>
  );
};

export default AnnouncementPage;
