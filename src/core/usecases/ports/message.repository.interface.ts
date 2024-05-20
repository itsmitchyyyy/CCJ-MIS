import { MessageParams } from '@/core/domain/dto/message.dto';

export default interface MessageRepositoryInterface {
  sendMessage(data: MessageParams): Promise<void>;
}
