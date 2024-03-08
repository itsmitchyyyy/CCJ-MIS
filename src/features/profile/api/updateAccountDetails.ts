import dependencies from '@/core/dependencies';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateAccountDetails = async (
  id: string,
  data: UpdateAccountDetails,
  hasPutMethod?: boolean,
): Promise<FetchAccountDetailsResponse> => {
  return await dependencies.adminProvider.adminRepository.updateAccountDetails(
    id,
    data,
    hasPutMethod,
  );
};

const useUpdateAccountDetails = () => {
  const query = useMutation({
    onSuccess: (response) => {
      console.log(response);
      toast.success('Account details updated');
    },
    mutationFn: (params: {
      id: string;
      data: UpdateAccountDetails;
      hasPutMethod?: boolean;
    }) => updateAccountDetails(params.id, params.data, params.hasPutMethod),
  });

  return query;
};

export { useUpdateAccountDetails };