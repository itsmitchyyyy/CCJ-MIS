import dependencies from '@/core/dependencies';
import { LoginDTO, LoginSuccessDTO } from '@/core/domain/dto/auth.dto';
import { useGlobalState } from '@/hooks/global';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const login = async (data: LoginDTO): Promise<LoginSuccessDTO> => {
  return await dependencies.authProvider.authRepository.login(data);
};

export const useLogin = () => {
  const {
    useAuth: { setIsLoggedIn, setToken, setEmailAddress, setIsLoggedInError },
  } = useGlobalState();

  return useMutation({
    onSuccess: (response) => {
      setIsLoggedIn(true);
      setToken(response.token);
      setEmailAddress(response.user.email);
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message: string })
        .message;
      console.log(errorMessage);
      setIsLoggedInError(errorMessage);
    },
    mutationFn: login,
  });
};
