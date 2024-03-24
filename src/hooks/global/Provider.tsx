import { useMemo, useState } from 'react';
import { GlobalState, GlobalStateContext } from '.';
import storage from '@/utils/storage';
import { storageKeys } from '@/constants/keys';
import { AccessType, ErrorMessageObject } from '@/features/account/types';

type Props = {
  value?: GlobalState;
  children?: React.ReactElement;
};

const Provider = (props: Props) => {
  const [id, setId] = useState<string>(() => {
    try {
      const data = storage.getItem(storageKeys.USER_ID);
      const parsedData = data ? JSON.parse(data) : '';
      return parsedData as string;
    } catch (error) {
      return '';
    }
  });

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

  const [accessType, setAccessType] = useState<AccessType | string>(() => {
    try {
      const data = storage.getItem(storageKeys.ACCESS_TYPE);
      const parsedData = data ? data : AccessType.Admin;
      return parsedData as AccessType;
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
      id,
      setId: (id: string) => {
        setId(id);
        storage.setItem(storageKeys.USER_ID, id);
      },
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
      accessType,
      setAccessType: (accessType: AccessType | string) => {
        setAccessType(accessType);
        storage.setItem(storageKeys.ACCESS_TYPE, accessType);
      },
      isLoggedInError,
      setIsLoggedInError: (error: string) => {
        setIsLoggedInError(error);
      },
      resetAuth: () => {
        setId('');
        setToken('');
        setEmailAddress('');
        setIsLoggedIn(false);
        setAccessType('');
        storage.removeItem(storageKeys.AUTH_TOKEN);
        storage.removeItem(storageKeys.EMAIL_ADDRESS);
        storage.removeItem(storageKeys.IS_LOGGED_IN);
        storage.removeItem(storageKeys.ACCESS_TYPE);
      },
    }),
    [
      id,
      setId,
      token,
      setToken,
      isLoggedIn,
      setIsLoggedIn,
      accessType,
      setAccessType,
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

  const [subjectError, setSubjectError] = useState<ErrorMessageObject>({
    errors: null,
    message: '',
  });

  const useSubject = useMemo(
    () => ({
      subjectError,
      setSubjectError: (errors: any) => setSubjectError(errors),
      removeSubjectError: () => setSubjectError({ errors: null, message: '' }),
    }),
    [subjectError],
  );

  return (
    <GlobalStateContext.Provider
      value={useMemo(
        () => ({ useAuth, useAccount, useSubject }),
        [
          id,
          token,
          isLoggedIn,
          emailAddress,
          accessType,
          isLoggedInError,
          accountError,
          subjectError,
        ],
      )}
      {...props}
    />
  );
};

export default Provider;
