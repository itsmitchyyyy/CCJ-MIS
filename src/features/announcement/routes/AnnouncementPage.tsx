import { AdminLayout } from '@/components/Layout';
import Announcement from '../components/Announcement';
import { useCreateAnnouncement } from '../api/createAnnouncement';

const AnnouncementPage = () => {
  const {
    mutate: createAnnouncement,
    isPending,
    isSuccess,
  } = useCreateAnnouncement();

  return (
    <AdminLayout>
      <Announcement
        onCreateAnnouncement={createAnnouncement}
        isCreatingAnnouncement={isPending}
        isSuccessfullyCreated={isSuccess}
      />
    </AdminLayout>
  );
};

export default AnnouncementPage;
