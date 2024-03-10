import urls from '@/constants/urls';
import {
  LoginDTO,
  LoginSuccessDTO,
  RegisterDTO,
} from '@/core/domain/dto/auth.dto';
import AuthRepositoryInterface from '@/core/usecases/ports/auth.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import { ChangePasswordRequest } from '@/features/profile/types';

export default class AuthRepository implements AuthRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  login = async (data: LoginDTO): Promise<LoginSuccessDTO> => {
    return await this.httpAdapter.post(urls.auth.login, data);
  };

  register = async (data: RegisterDTO): Promise<LoginSuccessDTO> => {
    return await this.httpAdapter.post(urls.auth.register, data);
  };

  logout = async (): Promise<void> => {
    return await this.httpAdapter.post(urls.auth.logout, {});
  };

  changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    return await this.httpAdapter.post(urls.auth.changePassword, data);
  };
}
