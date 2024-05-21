import {
  Message,
  MessageParams,
  MessageQuery,
  MessageThreadResponse,
} from '@/core/domain/dto/message.dto';

export default interface MessageRepositoryInterface {
  sendMessage(data: MessageParams): Promise<void>;
  getInboxMessages(query?: MessageQuery): Promise<Message[]>;
  getMessageThread(id: string): Promise<MessageThreadResponse>;
  markAsRead(id: string): Promise<void>;
}
