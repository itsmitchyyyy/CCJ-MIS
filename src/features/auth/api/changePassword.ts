import dependencies from '@/core/dependencies';
import { ErrorMessageObject } from '@/features/account/types';
import { ChangePasswordRequest } from '@/features/profile/types';
import { useGlobalState } from '@/hooks/global';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  return await dependencies.authProvider.authRepository.changePassword(data);
};

export const useChangePassword = () => {
  const {
    useAuth: { resetAuth },
    useAccount: { setAccountError },
  } = useGlobalState();

  return useMutation({
    onSuccess: () => {
      toast.success('Password changed successfully');
      resetAuth();
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as ErrorMessageObject;
      const mappedErrorData = Object.keys(errorData.errors).map((key) => ({
        [key]: errorData.errors[key][0],
      }));

      const errors = mappedErrorData.reduce((arr, obj: any) => {
        const key = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        arr[key] = value;

        return arr;
      }, {});

      setAccountError({ ...errorData, errors });
    },
    mutationFn: changePassword,
  });
};
