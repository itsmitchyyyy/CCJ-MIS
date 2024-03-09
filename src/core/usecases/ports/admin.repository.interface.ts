import {
  FetchAccountsParams,
  FetchAccountsResponse,
} from '@/features/account/types';

export default interface AdminRepositoryInterface {
  fetchAccountDetails(): Promise<FetchAccountDetailsResponse>;
  updateAccountDetails(
    id: string,
    data: UpdateAccountDetails,
    hasPutMethod?: boolean,
  ): Promise<FetchAccountDetailsResponse>;
  createAccount(data: CreateAccountDetails): Promise<void>;
  fetchAccounts(
    queryParams?: FetchAccountsParams,
  ): Promise<FetchAccountsResponse>;
  deleteAccount(id: string): Promise<void>;
}
