import { useMemo, useState } from 'react';
import { GlobalState, GlobalStateContext } from '.';
import storage from '@/utils/storage';
import { storageKeys } from '@/constants/keys';
import { ErrorMessageObject } from '@/features/account/types';

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

  const [accountError, setAccountError] = useState<ErrorMessageObject>({
    errors: null,
    message: '',
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
      resetAuth: () => {
        setToken('');
        setEmailAddress('');
        setIsLoggedIn(false);
        storage.removeItem(storageKeys.AUTH_TOKEN);
        storage.removeItem(storageKeys.EMAIL_ADDRESS);
        storage.removeItem(storageKeys.IS_LOGGED_IN);
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

  const useAccount = useMemo(
    () => ({
      accountError,
      setAccountError: (errors: any) => setAccountError(errors),
      removeAccountError: () => setAccountError({ errors: null, message: '' }),
    }),
    [accountError],
  );

  return (
    <GlobalStateContext.Provider
      value={useMemo(
        () => ({ useAuth, useAccount }),
        [token, isLoggedIn, emailAddress, isLoggedInError, accountError],
      )}
      {...props}
    />
  );
};

export default Provider;
