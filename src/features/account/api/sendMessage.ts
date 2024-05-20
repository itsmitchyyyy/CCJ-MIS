import dependencies from '@/core/dependencies';
import { MessageParams } from '@/core/domain/dto/message.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const sendMessage = async (data: MessageParams) => {
  return await dependencies.messageProvider.messageRepository.sendMessage(data);
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });

      toast.success('Message sent successfully');
    },
  });
};

export { useSendMessage };
