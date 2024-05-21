import { User } from '../entities/user.entity';

export enum NotificationStatus {
  READ = 'read',
  UNREAD = 'unread',
}

export type NotificationQuery = {
  user_id?: string;
  isEnabled?: boolean;
};

export type NotificationParams = {
  status?: NotificationStatus;
};

export type Notification = {
  id: string;
  user_id: string;
  user: User;
  message: string;
  url: string;
  event: string;
  status: NotificationStatus;
  created_at?: Date;
  updated_at?: Date;
};
