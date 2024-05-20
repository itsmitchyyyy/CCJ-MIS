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

export type Message = {
  id: string;
  to_id: string;
  to: User;
  message: string;
  send_from_id: string;
  send_from: User;
  subject: string;
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
  subject: string;
  attachment?: UploadFile[];
  type: MessageType;
};

export type MessageQuery = {
  to_id?: string;
  send_from_id?: string;
};
