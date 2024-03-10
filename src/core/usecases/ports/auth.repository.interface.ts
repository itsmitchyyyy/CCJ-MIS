import {
  LoginDTO,
  LoginSuccessDTO,
  RegisterDTO,
} from '@/core/domain/dto/auth.dto';
import { ChangePasswordRequest } from '@/features/profile/types';

export default interface AuthRepositoryInterface {
  login(data: LoginDTO): Promise<LoginSuccessDTO>;
  register(data: RegisterDTO): Promise<LoginSuccessDTO>;
  logout(): Promise<void>;
  changePassword(data: ChangePasswordRequest): Promise<void>;
}
