import { useAuthState } from '@/features/auth/types';
import { createContext, useContext } from 'react';

export type GlobalState = {
  useAuth: useAuthState;
};

export const GlobalStateContext = createContext<GlobalState | null>(null);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('Context not instantiated');
  }
  return context;
};
