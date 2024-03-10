import { AccessType } from '@/features/account/types';

export type useAuthState = {
  accessType: string;
  setAccessType: (type: AccessType | string) => void;
  token: string;
  setToken: (token: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  emailAddress: string;
  setEmailAddress: (emailAddress: string) => void;
  isLoggedInError: string;
  setIsLoggedInError: (error: string) => void;
  resetAuth: () => void;
};

export type LoginFormValues = {
  username: string;
  password: string;
};
