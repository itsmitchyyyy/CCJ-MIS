import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteAnnouncement = async (id: string): Promise<void> => {
  return await dependencies.announcementProvider.announcementRepository.deleteAnnouncement(
    id,
  );
};

const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement deleted successfully');
    },
  });
};

export { useDeleteAnnouncement };
