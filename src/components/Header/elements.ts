import { breakpoints } from '@/constants/displays';
import { colors } from '@/constants/themes';
import { typography } from '@/constants/themes/typography';
import { Header } from 'antd/es/layout/layout';
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
  height: 85px;
  width: 100px;

  img {
    border-radius: 50%;
  }

  &.anotherLogo {
    height: 70px;
    width: 70px;
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

export const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    ${typography.body.medium}
    font-weight: bold;
  }
`;
