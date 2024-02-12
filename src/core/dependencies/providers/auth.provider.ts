import AuthRepositoryInterface from '@/core/usecases/ports/auth.repository.interface';

export interface IAuthProvider {
  authRepository: AuthRepositoryInterface;
}

const authProvider = ({
  authRepository,
}: {
  authRepository: AuthRepositoryInterface;
}): IAuthProvider => {
  return { authRepository };
};

export default authProvider;
