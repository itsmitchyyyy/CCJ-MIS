import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const markAsRead = async (id: string): Promise<void> => {
  return await dependencies.messageProvider.messageRepository.markAsRead(id);
};

const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      queryClient.invalidateQueries({ queryKey: ['messageThread'] });
    },
  });
};

export { useMarkAsRead };
