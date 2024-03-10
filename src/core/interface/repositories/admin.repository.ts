import urls from '@/constants/urls';
import AdminRepositoryInterface from '@/core/usecases/ports/admin.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import {
  FetchAccountResponse,
  FetchAccountsParams,
  FetchAccountsResponse,
} from '@/features/account/types';
import { AxiosRequestConfig } from 'axios';

export default class AdminRepository implements AdminRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  fetchAccountDetails = async (): Promise<FetchAccountDetailsResponse> => {
    return await this.httpAdapter.get(urls.user.base, {});
  };

  updateAccountDetails = async (
    id: string,
    data: UpdateAccountDetails,
    hasPutMethod = false,
  ): Promise<FetchAccountDetailsResponse> => {
    let formHeaders = {};
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (hasPutMethod) {
      formData.append('_method', 'PUT');
      formHeaders = {
        headers: { 'Content-Type': 'multipart/form-data' },
      } as AxiosRequestConfig;
    }

    return this.httpAdapter.post(urls.user.update(id), formData, formHeaders);
  };

  createAccount = async (data: CreateAccountDetails): Promise<void> => {
    return await this.httpAdapter.post(urls.user.store, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  fetchAccounts = async (
    queryParams?: FetchAccountsParams,
  ): Promise<FetchAccountsResponse> => {
    return await this.httpAdapter.get(urls.user.list, {
      params: {
        ...queryParams,
      },
    });
  };

  deleteAccount = async (id: string): Promise<void> => {
    return await this.httpAdapter.delete(urls.user.delete(id), {});
  };

  fetchAccount = async (id: string): Promise<FetchAccountResponse> => {
    return await this.httpAdapter.get(urls.user.get(id), {});
  };
}
