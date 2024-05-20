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
  AvatarWrapper,
} from './elements';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLogout } from '@/features/auth/api/logout';
import { Avatar, FloatButton } from 'antd';
import { useGlobalState } from '@/hooks/global';
import { BACKEND_URL } from '@/config';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const {
    useAuth: { avatar },
  } = useGlobalState();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

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
            <AvatarWrapper onClick={() => navigate('/profile')}>
              <Avatar
                size="large"
                style={{ backgroundColor: '#f56a00' }}
                src={`${BACKEND_URL}/${avatar}`}
                icon={<UserOutlined />}
              />
            </AvatarWrapper>
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
      <FloatButton type="primary" icon={<MessageOutlined />} />
    </AdminLayoutContainer>
  );
};

export { AdminLayout };
