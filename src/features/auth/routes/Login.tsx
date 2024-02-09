import { Header } from '@/components/Header/Header';
import { CustomContent, CustomLayout } from '@/components/Header/elements';
import bgLogo from '@/assets/images/background.png';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  return (
    <CustomLayout>
      <Header />
      <CustomContent $imageLogo={bgLogo}>
        <LoginForm />
      </CustomContent>
    </CustomLayout>
  );
};
