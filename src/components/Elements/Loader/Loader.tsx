import { LoaderWrapper, Loading, LogoWrapper } from './elements';
import Logo from '@/assets/images/logo_4.png';

const Loader = () => {
  return (
    <LoaderWrapper>
      <LogoWrapper>
        <img src={Logo} alt="CCJ" />
      </LogoWrapper>
      <Loading />
    </LoaderWrapper>
  );
};

export default Loader;
