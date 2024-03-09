import dependencies from '@/core/dependencies';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteAccount = async (id: string): Promise<void> => {
  return await dependencies.adminProvider.adminRepository.deleteAccount(id);
};

const useDeleteAccount = () => {
  const query = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success('Account deleted');
    },
  });

  return query;
};

export { useDeleteAccount };
