import { User } from '@/core/domain/entities/user.entity';

export type Announcement = {
  title: string;
  description: string;
  id: string;
  user_id: string;
  user: User;
  images?: string[];
  created_at?: Date;
  updated_at?: Date;
};

export enum AnnouncementStatus {
  Active = 'active',
  Inactive = 'inactive',
}
