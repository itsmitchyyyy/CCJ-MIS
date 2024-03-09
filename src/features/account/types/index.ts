export type useAccountState = {
  accountError: ErrorMessageObject;
  setAccountError: (data: ErrorMessageObject) => void;
  removeAccountError: () => void;
};

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
