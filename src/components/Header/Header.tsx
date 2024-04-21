import { HeaderWrapper, LogoWrapper, TitleWrapper } from './elements';
import logo from '@/assets/images/logo.png';

export type HeaderProps = {};

export const Header = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <LogoWrapper>
          <img src={logo} alt="logo" />
        </LogoWrapper>
      </TitleWrapper>
    </HeaderWrapper>
  );
};
