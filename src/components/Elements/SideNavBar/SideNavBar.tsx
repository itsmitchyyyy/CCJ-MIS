import Sider from 'antd/es/layout/Sider';
import DashboardLogo from '@/assets/images/logo_3.png';
import { LogoWrapper } from './elements';
import { Menu } from 'antd';
import {
  AlertOutlined,
  DashboardOutlined,
  SettingOutlined,
  SignatureOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

type Props = {
  collapsed: boolean;
};

const SideNavBar = ({ collapsed }: Props) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <LogoWrapper>
        <img src={DashboardLogo} alt="logo" />
      </LogoWrapper>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Home',
          },
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
          },
          {
            key: 'announcement',
            icon: <AlertOutlined />,
            label: 'Announcement',
          },
          {
            key: 'approval',
            icon: <SignatureOutlined />,
            label: 'Approval',
          },
          {
            key: 'manage',
            icon: <SettingOutlined />,
            label: 'Manage',
          },
          {
            key: 'create-account',
            icon: <UserAddOutlined />,
            label: 'Create Account',
          },
        ]}
      />
    </Sider>
  );
};

export { SideNavBar };
