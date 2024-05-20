import dependencies from '@/core/dependencies';
import { MessageQuery } from '@/core/domain/dto/message.dto';
import { useQuery } from '@tanstack/react-query';

const getInboxMessages = async (query?: MessageQuery) => {
  return await dependencies.messageProvider.messageRepository.getInboxMessages(
    query,
  );
};

const useGetInboxMessages = (query?: MessageQuery) => {
  return useQuery({
    queryKey: ['inboxMessages', query],
    queryFn: () => getInboxMessages(query),
  });
};

export { useGetInboxMessages };
