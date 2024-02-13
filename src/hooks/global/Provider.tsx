import { useMemo, useState } from 'react';
import { GlobalState, GlobalStateContext } from '.';
import storage from '@/utils/storage';
import { storageKeys } from '@/constants/keys';

type Props = {
  value?: GlobalState;
  children?: React.ReactElement;
};

const Provider = (props: Props) => {
  const [isLoggedInError, setIsLoggedInError] = useState<string>('');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const data = storage.getItem(storageKeys.IS_LOGGED_IN);
      const parsedData = data ? JSON.parse(data) : false;
      return parsedData as boolean;
    } catch (error) {
      return false;
    }
  });

  const [token, setToken] = useState<string>(() => {
    try {
      const data = storage.getItem(storageKeys.AUTH_TOKEN);
      const parsedData = data ? JSON.parse(data) : '';
      return parsedData as string;
    } catch (error) {
      return '';
    }
  });

  const [emailAddress, setEmailAddress] = useState<string>(() => {
    try {
      const data = storage.getItem(storageKeys.EMAIL_ADDRESS);
      const parsedData = data ? JSON.parse(data) : '';
      return parsedData as string;
    } catch (error) {
      return '';
    }
  });

  const useAuth = useMemo(
    () => ({
      token,
      setToken: (token: string) => {
        setToken(token);
        storage.setItem(storageKeys.AUTH_TOKEN, token);
      },
      isLoggedIn,
      setIsLoggedIn: (isLoggedIn: boolean) => {
        setIsLoggedIn(isLoggedIn);
        storage.setItem(storageKeys.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
      },
      emailAddress,
      setEmailAddress: (email: string) => {
        setEmailAddress(email);
        storage.setItem(storageKeys.EMAIL_ADDRESS, email);
      },
      isLoggedInError,
      setIsLoggedInError: (error: string) => {
        setIsLoggedInError(error);
      },
    }),
    [
      token,
      setToken,
      isLoggedIn,
      setIsLoggedIn,
      isLoggedInError,
      setIsLoggedInError,
      emailAddress,
      setEmailAddress,
    ],
  );

  return (
    <GlobalStateContext.Provider
      value={useMemo(
        () => ({ useAuth }),
        [token, isLoggedIn, emailAddress, isLoggedInError],
      )}
      {...props}
    />
  );
};

export default Provider;
