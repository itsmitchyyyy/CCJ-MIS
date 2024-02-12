import {
  LoginDTO,
  LoginSuccessDTO,
  RegisterDTO,
} from '@/core/domain/dto/auth.dto';

export default interface AuthRepositoryInterface {
  login(data: LoginDTO): Promise<LoginSuccessDTO>;
  register(data: RegisterDTO): Promise<LoginSuccessDTO>;
}
