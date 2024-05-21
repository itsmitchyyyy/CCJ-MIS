import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const markAsRead = async (id: string): Promise<void> => {
  return await dependencies.messageProvider.messageRepository.markAsRead(id);
};

const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      queryClient.invalidateQueries({ queryKey: ['messageThread'] });
    },
  });
};

export { useMarkAsRead };
