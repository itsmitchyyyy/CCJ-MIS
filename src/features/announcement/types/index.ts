import { User } from '@/core/domain/entities/user.entity';

export enum AnnouncementType {
  Student = 'student',
  Teacher = 'teacher',
  All = 'all',
}

export enum AnnouncementStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export type Announcement = {
  title: string;
  description: string;
  id: string;
  posted_by_id: string;
  posted_by: User;
  posted_at: Date;
  images?: string[];
  created_at?: Date;
  updated_at?: Date;
};
