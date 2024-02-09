export type useAuthState = {
  token: string;
  setToken: (token: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  emailAddress: string;
  setEmailAddress: (emailAddress: string) => void;
};
