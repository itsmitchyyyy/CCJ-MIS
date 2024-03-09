import dependencies from '@/core/dependencies';
import { FetchAccountsParams, FetchAccountsResponse } from '../types';
import { useQuery } from '@tanstack/react-query';

const fetchAccounts = async (
  queryParams?: FetchAccountsParams,
): Promise<FetchAccountsResponse> => {
  return await dependencies.adminProvider.adminRepository.fetchAccounts(
    queryParams,
  );
};

const useFetchAccounts = (queryParams?: FetchAccountsParams) => {
  const query = useQuery({
    queryKey: ['fetch-accounts', queryParams],
    queryFn: () => fetchAccounts(queryParams),
  });

  return query;
};

export { useFetchAccounts };
