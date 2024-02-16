import dependencies from '@/core/dependencies';
import { useGlobalState } from '@/hooks/global';
import { useMutation } from '@tanstack/react-query';

export const logout = async (): Promise<void> => {
  return await dependencies.authProvider.authRepository.logout();
};

export const useLogout = () => {
  const {
    useAuth: { resetAuth },
  } = useGlobalState();

  return useMutation({
    onSuccess: () => {
      resetAuth();
    },
    mutationFn: logout,
  });
};
