import { Header } from '@/components/Header/Header';
import bgLogo from '@/assets/images/background.png';
import { LoginForm } from '../components/LoginForm';
import { CustomContentContainer } from '@/components/Layout/elements';
import { MainLayout } from '@/components/Layout';

export const Login = () => {
  return (
    <MainLayout>
      <Header />
      <CustomContentContainer $imageLogo={bgLogo}>
        <LoginForm />
      </CustomContentContainer>
    </MainLayout>
  );
};
