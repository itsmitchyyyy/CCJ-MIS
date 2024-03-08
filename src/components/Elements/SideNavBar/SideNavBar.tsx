import Sider from 'antd/es/layout/Sider';
import DashboardLogo from '@/assets/images/logo_3.png';
import { LogoWrapper } from './elements';
import { Menu, MenuProps } from 'antd';
import {
  AlertOutlined,
  DashboardOutlined,
  SettingOutlined,
  SignatureOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  collapsed: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return { key, label, icon, children };
};

const items: MenuItem[] = [
  getItem('Home', 'dashboard', <DashboardOutlined />),
  getItem('Profile', 'profile', <UserOutlined />),
  getItem('Announcement', 'announcement', <AlertOutlined />),
  getItem('Approval', 'approval', <SignatureOutlined />),
  getItem('Manage', 'manage', <SettingOutlined />),
  getItem('Account', 'account', <UserAddOutlined />),
];

const SideNavBar = ({ collapsed }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'account':
        navigate('/account');
        break;
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <LogoWrapper>
        <img src={DashboardLogo} alt="logo" />
      </LogoWrapper>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname.replace('/', '')]}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export { SideNavBar };