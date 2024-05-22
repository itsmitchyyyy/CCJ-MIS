import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  FetchAccountDetailsResponse,
  UpdateAccountDetailResponse,
  UpdateAccountDetails,
} from '../types';
import { AxiosError } from 'axios';
import { ErrorMessageObject } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';

const updateAccountDetails = async (
  id: string,
  data: UpdateAccountDetails,
  hasPutMethod?: boolean,
): Promise<UpdateAccountDetailResponse> => {
  return await dependencies.adminProvider.adminRepository.updateAccountDetails(
    id,
    data,
    hasPutMethod,
  );
};

const useUpdateAccountDetails = () => {
  const {
    useAccount: { setAccountError },
    useAuth: { setAvatar },
  } = useGlobalState();
  const queryClient = useQueryClient();

  const query = useMutation({
    onSuccess: ({ data: { id, profile_picture } }) => {
      queryClient.invalidateQueries({ queryKey: [`fetch-account-${id}`] });
      queryClient.invalidateQueries({ queryKey: ['profileDetails'] });

      setAvatar(profile_picture);
      toast.success('Account details updated');
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
    mutationFn: (params: {
      id: string;
      data: UpdateAccountDetails;
      hasPutMethod?: boolean;
    }) => updateAccountDetails(params.id, params.data, params.hasPutMethod),
  });

  return query;
};

export { useUpdateAccountDetails };
