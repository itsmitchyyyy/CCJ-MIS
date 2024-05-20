import MessageRepositoryInterface from '@/core/usecases/ports/message.repository.interface';

export interface IMessageProvider {
  messageRepository: MessageRepositoryInterface;
}

const messageProvider = ({
  messageRepository,
}: {
  messageRepository: MessageRepositoryInterface;
}): IMessageProvider => {
  return { messageRepository };
};

export default messageProvider;
