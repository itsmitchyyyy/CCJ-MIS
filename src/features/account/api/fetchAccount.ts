import dependencies from '@/core/dependencies';
import { FetchAccountResponse } from '../types';
import { useQuery } from '@tanstack/react-query';

const fetchAccount = async (id: string): Promise<FetchAccountResponse> => {
  return await dependencies.adminProvider.adminRepository.fetchAccount(id);
};

const useFetchAccount = (id: string) => {
  const query = useQuery({
    queryKey: [`fetch-account-${id}`],
    queryFn: () => fetchAccount(id),
  });

  return query;
};

export { useFetchAccount };
