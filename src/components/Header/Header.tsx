import {
  HeaderTitleWrapper,
  HeaderWrapper,
  LogoWrapper,
  TitleWrapper,
} from './elements';
import logo from '@/assets/images/ccj.jpg';
// import anotherLogo from '@/assets/images/logo_4.png';
import uc from '@/assets/images/uc.jpg';

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
        <HeaderTitleWrapper>
          <span>University of Cebu – Main Campus</span>
          <span>College of Criminal Justice</span>
        </HeaderTitleWrapper>
      </TitleWrapper>

      <TitleWrapper>
        <LogoWrapper>
          <img src={uc} alt="logo" />
        </LogoWrapper>
      </TitleWrapper>
    </HeaderWrapper>
  );
};
