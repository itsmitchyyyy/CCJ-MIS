import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const getMessageThread = async (threadId: string) => {
  return await dependencies.messageProvider.messageRepository.getMessageThread(
    threadId,
  );
};

const useGetMessageThread = (threadId: string) => {
  return useQuery({
    queryKey: ['messageThread', threadId],
    queryFn: () => getMessageThread(threadId),
  });
};

export { useGetMessageThread };
