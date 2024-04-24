import { HeaderWrapper, LogoWrapper, TitleWrapper } from './elements';
import logo from '@/assets/images/logo.png';
import anotherLogo from '@/assets/images/logo_4.png';

export type HeaderProps = {};

export const Header = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <LogoWrapper>
          <img src={logo} alt="logo" />
        </LogoWrapper>
      </TitleWrapper>

      <TitleWrapper>
        <LogoWrapper className="anotherLogo">
          <img src={anotherLogo} alt="logo" />
        </LogoWrapper>
      </TitleWrapper>
    </HeaderWrapper>
  );
};
