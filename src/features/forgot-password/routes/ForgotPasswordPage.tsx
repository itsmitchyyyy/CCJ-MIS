import { MainLayout } from '@/components/Layout';
import bgLogo from '@/assets/images/background.png';
import ForgotPassword from '../components/ForgotPassword';
import { CustomContentContainer } from '@/components/Layout/elements';
import { Header } from '@/components/Header/Header';
import useForgotPassword from '../api/forgotPassword';

const ForgotPasswordPage = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const testSubmit = (data: { email: string }) => {
    forgotPassword(data.email);
  };

  return (
    <MainLayout>
      <Header />
      <CustomContentContainer $imageLogo={bgLogo}>
        <ForgotPassword onSubmit={testSubmit} loading={isPending} />
      </CustomContentContainer>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
