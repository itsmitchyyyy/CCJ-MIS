import {
  FetchTeacherQueryParams,
  FetchTeachersResponseDTO,
} from '@/core/domain/dto/user.dto';
import {
  FetchAccountResponse,
  FetchAccountsParams,
  FetchAccountsResponse,
} from '@/features/account/types';
import {
  CreateAccountDetails,
  FetchAccountDetailsResponse,
  UpdateAccountDetailResponse,
  UpdateAccountDetails,
} from '@/features/profile/types';

export default interface AdminRepositoryInterface {
  fetchAccountDetails(): Promise<FetchAccountDetailsResponse>;
  updateAccountDetails(
    id: string,
    data: UpdateAccountDetails,
    hasPutMethod?: boolean,
  ): Promise<UpdateAccountDetailResponse>;
  createAccount(data: CreateAccountDetails): Promise<void>;
  fetchAccounts(
    queryParams?: FetchAccountsParams,
  ): Promise<FetchAccountsResponse>;
  fetchAccount(id: string): Promise<FetchAccountResponse>;
  deleteAccount(id: string): Promise<void>;
}
