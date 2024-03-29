import { useAccountState } from '@/features/account/types';
import { useAuthState } from '@/features/auth/types';
import { useSubjectState } from '@/features/management/types';
import { createContext, useContext } from 'react';

export type GlobalState = {
  useAuth: useAuthState;
  useAccount: useAccountState;
  useSubject: useSubjectState;
};

export const GlobalStateContext = createContext<GlobalState | null>(null);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('Context not instantiated');
  }
  return context;
};
