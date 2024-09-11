import { MainLayout } from '@/components/Layout';
import bgLogo from '@/assets/images/background.png';
import ForgotPassword from '../components/ForgotPassword';
import { CustomContentContainer } from '@/components/Layout/elements';
import { Header } from '@/components/Header/Header';

const ForgotPasswordPage = () => {
  const testSubmit = (data: { email: string }) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <Header />
      <CustomContentContainer $imageLogo={bgLogo}>
        <ForgotPassword onSubmit={testSubmit} />
      </CustomContentContainer>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
