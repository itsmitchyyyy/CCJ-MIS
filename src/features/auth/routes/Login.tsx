import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { CustomContent, CustomLayout } from '@/components/Header/elements';
import bgLogo from '@/assets/images/background.png';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const [count, setCount] = useState(0);

  return (
    <CustomLayout>
      <Header />
      <CustomContent imageLogo={bgLogo}>
        <LoginForm />
      </CustomContent>
    </CustomLayout>
  );
};
