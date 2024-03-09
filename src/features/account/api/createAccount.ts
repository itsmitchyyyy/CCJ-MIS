import dependencies from '@/core/dependencies';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createAccount = async (data: CreateAccountDetails): Promise<void> => {
  return await dependencies.adminProvider.adminRepository.createAccount(data);
};

const useCreateAccount = () => {
  const query = useMutation({
    mutationKey: ['createAccount'],
    onSuccess: () => {
      toast.success('Account created');
    },
    mutationFn: createAccount,
  });

  return query;
};

export { useCreateAccount };
