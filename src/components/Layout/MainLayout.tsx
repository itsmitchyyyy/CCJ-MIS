import { MainLayoutContainer } from './elements';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <MainLayoutContainer>{children}</MainLayoutContainer>;
};

export { MainLayout };
