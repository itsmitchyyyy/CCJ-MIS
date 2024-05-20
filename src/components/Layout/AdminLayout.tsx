import { useEffect, useRef, useState } from 'react';
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
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLogout } from '@/features/auth/api/logout';
import { Avatar, Button, FloatButton, Form, Input, Spin, Upload } from 'antd';
import { useGlobalState } from '@/hooks/global';
import { BACKEND_URL } from '@/config';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Elements/Modal';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useFetchAccounts } from '@/features/account/api/fetchAccounts';
import Select from 'antd/es/select';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const {
    useAuth: { avatar },
  } = useGlobalState();

  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data: users = { data: [] }, isFetching } = useFetchAccounts({
    search,
  });

  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const [openComposeModal, setOpenComposeModal] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);

  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleSearch = (keyword: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(keyword);
    }, 500);
  };

  const performSearch = (keyword: string) => {
    setSearch(keyword);
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    setDocumentFiles([...documentFiles, ...fileList]);
    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = documentFiles.indexOf(file);
    const newDocumentFiles = documentFiles.slice();
    newDocumentFiles.splice(index, 1);
    setDocumentFiles(newDocumentFiles);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
      <FloatButton
        type="primary"
        onClick={() => setOpenComposeModal(true)}
        icon={<MessageOutlined />}
      />

      <Modal
        centered
        okText="Send"
        title="Compose Message"
        open={openComposeModal}
        onSubmit={() => {}}
        onCancel={() => setOpenComposeModal(false)}>
        <Form layout="vertical">
          <Form.Item label="To" name="to">
            <Select
              showSearch
              filterOption={false}
              notFoundContent={isFetching ? <Spin size="small" /> : null}
              onSearch={handleSearch}
              placeholder="Search user">
              {users.data.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Subject" name="subject">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={6} cols={6} />
          </Form.Item>
          <Form.Item label="Files" name="files">
            <Upload
              fileList={documentFiles}
              multiple
              beforeUpload={handleBeforeUploadFile}
              onRemove={handleOnRemoveFile}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayoutContainer>
  );
};

export { AdminLayout };
