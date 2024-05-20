export type useAccountState = {
  accountError: ErrorMessageObject;
  setAccountError: (data: ErrorMessageObject) => void;
  removeAccountError: () => void;
};

export enum AccountStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum AccessType {
  Student = 'student',
  Admin = 'admin',
  Teacher = 'teacher',
}

export type RoleType = 'student' | 'admin' | 'teacher';

export type ErrorMessageObject = {
  errors: any;
  message: string;
};

export type Account = {
  id: string;
  name: string;
};

export type AccountDetails = {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  username: string;
  access_type: AccessType;
  status: AccountStatus;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FetchAccountsResponse = {
  data: AccountDetails[];
};

export type FetchAccountsParams = {
  access_type?: AccessType;
  search?: string;
};

export type FetchAccountResponse = {
  data: AccountDetails;
};

export type UpdateAccountDetail = Omit<
  AccountDetails,
  'createdAt' | 'updatedAt'
> & {
  profile_picture?: File;
};

export type UpdateAccountDetailRequset = Omit<
  UpdateAccountDetail,
  'status' | 'id'
>;
