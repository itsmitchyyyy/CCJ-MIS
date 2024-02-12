import { Header } from '@/components/Header/Header';
import bgLogo from '@/assets/images/background.png';
import { LoginForm } from '../components/LoginForm';
import { CustomContentContainer } from '@/components/Layout/elements';
import { MainLayout } from '@/components/Layout';
import { useLogin } from '../api/login';
import { LoginDTO } from '@/core/domain/dto/auth.dto';

export const Login = () => {
  const { mutate: loginMutation, isPending } = useLogin();

  const onSubmit = (data: LoginDTO) => loginMutation(data);

  return (
    <MainLayout>
      <Header />
      <CustomContentContainer $imageLogo={bgLogo}>
        <LoginForm onSubmit={onSubmit} loading={isPending} />
      </CustomContentContainer>
    </MainLayout>
  );
};
