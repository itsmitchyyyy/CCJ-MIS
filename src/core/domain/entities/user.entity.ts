export enum UserStatus {
  Active = 'active',
  InActive = 'inactive',
}

export enum UserAccessType {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}

interface UserInfo {
  first_name: string;
  last_name: string;
  contact_number: string;
  username: string;
  access_type: UserAccessType;
  profile_picture?: string;
  status: UserStatus;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface User extends UserInfo {
  id: string;
}
