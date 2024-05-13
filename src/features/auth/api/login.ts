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
    useAuth: {
      setId,
      setIsLoggedIn,
      setToken,
      setEmailAddress,
      setIsLoggedInError,
      setAccessType,
      setAvatar,
    },
  } = useGlobalState();

  return useMutation({
    onSuccess: (response) => {
      setId(response.user.id);
      setIsLoggedIn(true);
      setToken(response.token);
      setEmailAddress(response.user.email);
      setAccessType(response.user.access_type);
      setAvatar(response.user.profile_picture);
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message: string })
        .message;
      setIsLoggedInError(errorMessage);
    },
    mutationFn: login,
  });
};
