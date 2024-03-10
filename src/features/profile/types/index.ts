import { AccessType } from '@/features/account/types';

export type FetchAccountDetailsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  username: string;
  profile_picture: string;
  access_type: string;
  status: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type UpdateAccountDetailResponse = {
  data: FetchAccountDetailsResponse;
};

export type ProfileDetail = {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  profilePicture: string;
  username: string;
  accessType?: string;
  status?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateAccountDetails = {
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  profile_picture?: File;
  username?: string;
  access_type?: AccessType;
};

export type CreateAccountDetails = {
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  username: string;
  password: string;
  profile_picture?: File;
};

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};
