import dependencies from '@/core/dependencies';
import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createAnnouncement = async (data: StoreAnnouncementDTO) => {
  return await dependencies.announcementProvider.announcementRepository.createAnnouncement(
    data,
  );
};

const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement created successfully');
    },
  });
};

export { useCreateAnnouncement };
