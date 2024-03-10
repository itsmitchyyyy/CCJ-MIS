import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';
import { FetchAccountDetailsResponse } from '../types';

const getProfileDetails = async (): Promise<FetchAccountDetailsResponse> => {
  return await dependencies.adminProvider.adminRepository.fetchAccountDetails();
};

const useProfileDetails = () => {
  const query = useQuery({
    queryKey: ['profileDetails'],
    queryFn: getProfileDetails,
  });

  return query;
};

export { useProfileDetails };
