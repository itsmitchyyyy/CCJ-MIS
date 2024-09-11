import dependencies from '@/core/dependencies';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const forgotPassword = async (email: string) => {
  return await dependencies.authProvider.authRepository.forgotPassword(email);
};

const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Email sent successfully');
    },
  });

  return mutation;
};

export default useForgotPassword;
