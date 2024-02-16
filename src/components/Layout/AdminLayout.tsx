import { useState } from 'react';
import { SideNavBar } from '../Elements/SideNavBar';
import {
  AdminLayoutContainer,
  AdminContentLayoutContainer,
  ToggleSidebar,
  StyledHeader,
  StyledContent,
  LogoutWrapper,
  LogoutButton,
} from './elements';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLogout } from '@/features/auth/api/logout';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { mutate: logout, isPending } = useLogout();

  return (
    <AdminLayoutContainer>
      <SideNavBar collapsed={collapsed} />

      <AdminContentLayoutContainer>
        <StyledHeader>
          <ToggleSidebar
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <LogoutWrapper>
            <LogoutButton
              type="text"
              onClick={() => logout()}
              disabled={isPending}>
              Logout
            </LogoutButton>
          </LogoutWrapper>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
      </AdminContentLayoutContainer>
    </AdminLayoutContainer>
  );
};

export { AdminLayout };
