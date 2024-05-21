import { UploadFile } from 'antd';
import { User } from '../entities/user.entity';

export enum MessageStatus {
  READ = 'read',
  UNREAD = 'unread',
}

export enum MessageType {
  INBOX = 'inbox',
  SENT = 'sent',
}

export type MessageThread = {
  id: string;
  last_message_at: string;
  last_message_id: string;
  subject: string;
  unread_count: number;
  user_one: User;
  user_one_id: string;
  user_two: User;
  user_two_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type MessageThreadResponse = MessageThread & {
  messages: Message[];
};

export type Message = {
  id: string;
  to_id: string;
  to: User;
  message: string;
  message_thread_id: string;
  message_thread: MessageThread;
  send_from_id: string;
  send_from: User;
  attachment?: string[];
  type: MessageType;
  status: MessageStatus;
  sent_at: string;
  read_at?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type MessageParams = {
  to_id: string;
  message: string;
  send_from_id: string;
  subject?: string;
  attachment?: UploadFile[];
  type: MessageType;
  message_thread_id?: string;
};

export type ReplyMessageParams = Omit<MessageParams, 'subject'> & {
  message_thread_id: string;
};

export type MessageQuery = {
  to_id?: string;
  send_from_id?: string;
  isGroup?: boolean;
  message_thread_id?: string;
};
