import { UploadFile } from 'antd';

export enum MessageType {
  INBOX = 'inbox',
  SENT = 'sent',
}

export type MessageParams = {
  to_id: string;
  message: string;
  send_from_id: string;
  subject: string;
  attachment?: UploadFile[];
  type: MessageType;
};
