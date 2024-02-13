import urls from '@/constants/urls';
import AdminRepositoryInterface from '@/core/usecases/ports/admin.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';

export default class AdminRepository implements AdminRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  fetchAccountDetails = async (): Promise<FetchAccountDetailsResponse> => {
    return await this.httpAdapter.get(urls.user.base, {});
  };
}
