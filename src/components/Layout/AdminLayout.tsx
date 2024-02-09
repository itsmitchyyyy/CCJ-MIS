import { useState } from 'react';
import { SideNavBar } from '../Elements/SideNavBar';
import {
  AdminLayoutContainer,
  AdminContentLayoutContainer,
  ToggleSidebar,
  StyledHeader,
  StyledContent,
} from './elements';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

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
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
      </AdminContentLayoutContainer>
    </AdminLayoutContainer>
  );
};

export { AdminLayout };
