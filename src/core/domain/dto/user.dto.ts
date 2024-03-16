import { AccessType } from '@/features/account/types';
import { UserStatus } from '../entities/user.entity';

export type FetchTeacherQueryParams = {
  status?: UserStatus;
};

export type FetchTeachersResponseDTO = {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  access_type: AccessType;
  username: string;
  status: UserStatus;
  profile_picture?: string;
  email: string;
  email_verified_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
