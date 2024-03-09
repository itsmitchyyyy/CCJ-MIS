import dependencies from '@/core/dependencies';
import { useGlobalState } from '@/hooks/global';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorMessageObject } from '../types';

const createAccount = async (data: CreateAccountDetails): Promise<void> => {
  return await dependencies.adminProvider.adminRepository.createAccount(data);
};

const useCreateAccount = () => {
  const {
    useAccount: { setAccountError },
  } = useGlobalState();

  const query = useMutation({
    mutationKey: ['createAccount'],
    onSuccess: () => {
      toast.success('Account created');
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
    mutationFn: createAccount,
  });

  return query;
};

export { useCreateAccount };
