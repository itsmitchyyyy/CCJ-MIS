import {
  FetchAccountResponse,
  FetchAccountsParams,
  FetchAccountsResponse,
} from '@/features/account/types';
import {
  CreateAccountDetails,
  FetchAccountDetailsResponse,
  UpdateAccountDetails,
} from '@/features/profile/types';

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
  fetchAccount(id: string): Promise<FetchAccountResponse>;
  deleteAccount(id: string): Promise<void>;
}
