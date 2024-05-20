import Sider from 'antd/es/layout/Sider';
import DashboardLogo from '@/assets/images/logo_3.png';
import { LogoWrapper } from './elements';
import { Menu, MenuProps } from 'antd';
import {
  AlertOutlined,
  BankOutlined,
  BookOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  FundOutlined,
  HomeOutlined,
  InboxOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { useState } from 'react';

type Props = {
  collapsed: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};

const SideNavBar = ({ collapsed }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    useAuth: { accessType },
  } = useGlobalState();
  const splitPathName = pathname.split('/');

  const selectedKey = !pathname.includes('management')
    ? splitPathName[1] === 'facilities' &&
      splitPathName.length > 2 &&
      splitPathName[2] === 'requests'
      ? ['facility_request']
      : splitPathName[1] === 'facilities' &&
        splitPathName.length > 2 &&
        splitPathName[2] === 'reports'
      ? ['facility_reports']
      : [splitPathName[1]]
    : splitPathName.length > 3
    ? [`${splitPathName[2]}s`]
    : splitPathName[2] === 'requests'
    ? ['facility_request']
    : [splitPathName[2]];

  const defaultOpenKeys =
    splitPathName[1] === 'management'
      ? ['manage']
      : splitPathName[1] === 'facilities'
      ? ['facility']
      : splitPathName[1] === 'announcements' || splitPathName[1] === 'dashboard'
      ? ['home']
      : [];

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(defaultOpenKeys);

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return { key, label, icon, children };
  };

  const items: MenuItem[] = [
    accessType === AccessType.Admin
      ? getItem('Home', 'home', <HomeOutlined />, [
          getItem('Home', 'dashboard', <DashboardOutlined />),
          getItem('Announcement', 'announcements', <AlertOutlined />),
        ])
      : getItem('Home', 'dashboard', <DashboardOutlined />),
    getItem('Documents', 'documents', <FileProtectOutlined />),
    accessType === AccessType.Admin
      ? getItem('Facility', 'facility', <BankOutlined />, [
          getItem('List', 'facilities', <OrderedListOutlined />),
          getItem('Request', 'facility_request', <BookOutlined />),
          getItem('Reports', 'facility_reports', <FundOutlined />),
        ])
      : getItem('Facilities', 'facilities', <BankOutlined />),
    accessType === AccessType.Admin
      ? getItem('Manage', 'manage', <SettingOutlined />, [
          getItem('Subjects', 'subjects', <BookOutlined />),
          getItem('Teachers', 'teachers', <UserOutlined />),
        ])
      : getItem('Manage', 'manage', <SettingOutlined />),
    getItem('Account', 'account', <UserAddOutlined />),
    getItem('Inbox', 'inbox', <InboxOutlined />),
  ];

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          return func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'account':
        navigate('/account');
        break;
      case 'manage':
        navigate('/management');
        break;
      case 'documents':
        navigate('/documents');
        break;
      case 'subjects':
        navigate('/management/subjects');
        break;
      case 'teachers':
        navigate('/management/teachers');
        break;
      case 'facilities':
        navigate('/facilities');
        break;
      case 'facility_request':
        navigate('/facilities/requests');
        break;
      case 'facility_reports':
        navigate('/facilities/reports');
        break;
      case 'announcements':
        navigate('/announcements');
        break;
      case 'inbox':
        navigate('/messages/inbox');
        break;
    }
  };

  const filteredItem = items.filter((item) => {
    switch (accessType) {
      case AccessType.Admin:
        return item;
      case AccessType.Teacher:
        return item?.key !== 'account' && item?.key !== 'announcement';
      case AccessType.Student:
        return (
          item?.key !== 'account' &&
          item?.key !== 'facilities' &&
          item?.key !== 'announcement'
        );
      default:
        return item;
    }
  });

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <LogoWrapper>
        <img src={DashboardLogo} alt="logo" />
      </LogoWrapper>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey}
        items={filteredItem}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export { SideNavBar };
