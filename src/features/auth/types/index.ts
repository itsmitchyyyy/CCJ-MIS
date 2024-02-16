export type useAuthState = {
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
