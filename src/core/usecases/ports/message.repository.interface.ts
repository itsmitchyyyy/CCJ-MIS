import {
  Message,
  MessageParams,
  MessageQuery,
} from '@/core/domain/dto/message.dto';

export default interface MessageRepositoryInterface {
  sendMessage(data: MessageParams): Promise<void>;
  getInboxMessages(query?: MessageQuery): Promise<Message[]>;
}
