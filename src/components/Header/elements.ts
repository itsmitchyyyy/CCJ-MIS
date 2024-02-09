import { breakpoints } from '@/constants/displays';
import { colors } from '@/constants/themes';
import { typography } from '@/constants/themes/typography';
import Layout, { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const HeaderWrapper = styled(Header)`
  display: flex;
  height: 90px;
  padding: 8px 20px;
  width: 100%;
  box-shadow: -4px -4px 10px 1px ${colors.keyColors.grey};
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: ${colors.sysLight.surface};

  margin-bottom: 12px;
  z-index: 1;
`;

export const LogoWrapper = styled.div`
  display: flex;
  height: 90px;
  width: 90px;

  &.anotherLogo {
    height: 100px;
    width: 100px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  ${typography.body.small}

  span {
    display: none;
    padding-right: 12px;

    @media only screen and ${breakpoints.lg} {
      display: block;
    }
  }
`;

export const CustomLayout = styled(Layout)`
  background-color: ${colors.sysLight.surface};

  //   @media ${breakpoints.desktop} {
  //     max-width: 768px;
  //     margin-left: auto;
  //     margin-right: auto;
  //   }
`;

export const CustomContent = styled(Layout)<{ $imageLogo: string }>`
  height: calc(100vh - 102px);
  background: url('${({ $imageLogo }) => $imageLogo}') no-repeat center center
    fixed;
  background-size: cover;
`;
