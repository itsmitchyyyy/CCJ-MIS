import { breakpoints } from '@/constants/displays';
import { colors } from '@/constants/themes';
import { Button } from 'antd';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const MainLayoutContainer = styled(Layout)`
  background-color: ${colors.sysLight.surface};

  //   @media ${breakpoints.desktop} {
  //     max-width: 768px;
  //     margin-left: auto;
  //     margin-right: auto;
  //   }
`;

export const CustomContentContainer = styled(Layout)<{ $imageLogo: string }>`
  height: calc(100vh - 102px);
  background: url('${({ $imageLogo }) => $imageLogo}') no-repeat center center
    fixed;
  background-size: cover;
`;

export const AdminLayoutContainer = styled(Layout)``;

export const StyledHeader = styled(Header)`
  background: ${colors.sysLight.surface};
  padding: 0;
  display: flex;
`;

export const ToggleSidebar = styled(Button)`
  font-size: 16px;
  width: 64px;
  height: 64px;
`;

export const StyledContent = styled(Content)`
  min-height: calc(100vh - 112px);
  max-height: calc(100vh - 112px);
  background: ${colors.sysLight.surface};
  padding: 24px;
  margin: 24px 16px;
  border-radius: 8px;
  overflow: auto;
`;

export const AdminContentLayoutContainer = styled(Layout)``;

export const LogoutWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1em;
`;

export const LogoutButton = styled(Button)``;
