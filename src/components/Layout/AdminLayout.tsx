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
  IconWrapper,
  NotificationContent,
  NotificationContainer,
  AccessWrapper,
} from './elements';
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLogout } from '@/features/auth/api/logout';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  FloatButton,
  Form,
  Input,
  Spin,
  Upload,
} from 'antd';
import { useGlobalState } from '@/hooks/global';
import { BACKEND_URL } from '@/config';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Elements/Modal';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useFetchAccounts } from '@/features/account/api/fetchAccounts';
import Select from 'antd/es/select';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorWrapper } from '@/features/account/components/elements';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageValidationSchema } from '@/features/account/components/validation';
import { useSendMessage } from '@/features/account/api/sendMessage';
import { MessageParams, MessageType } from '@/core/domain/dto/message.dto';
import { useClickOutside } from '@/hooks/useClickOutside';
import Pusher from 'pusher-js';
import { useGetNotifications } from '@/features/account/api/getNotifications';
import { useUpdateNotification } from '@/features/account/api/updateNotification';
import { NotificationStatus } from '@/core/domain/dto/notification.dto';
import { humanDateFormatter } from '@/utils/format';
import { AccessType } from '@/features/account/types';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const {
    useAuth: { avatar, id, accessType },
  } = useGlobalState();

  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data: users = { data: [] }, isFetching } = useFetchAccounts({
    search,
  });
  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    isSuccess,
  } = useSendMessage();
  const {
    data: notifications = [],
    isFetching: isFetchingNotifications,
    refetch: refetchNotifications,
  } = useGetNotifications({ user_id: id });
  const { mutate: logout, isPending } = useLogout();
  const { mutate: updateNotification } = useUpdateNotification();

  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  const [openComposeModal, setOpenComposeModal] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { ref, isClickOutside, setIsClickOutside } =
    useClickOutside(showNotification);
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: 'Profile',
      onClick: () => navigate('/profile'),
      key: 'profile',
    },
    {
      label: 'My Attendance',
      onClick: () => navigate('/profile/attendance-records'),
      key: 'attendance',
    },
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      to: '',
      subject: '',
      description: '',
    },
    resolver: yupResolver(messageValidationSchema),
  });

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

  const onSendMessage = ({
    to,
    subject,
    description,
  }: {
    to: string;
    subject: string;
    description: string;
  }) => {
    const payload: MessageParams = {
      message: description,
      send_from_id: id,
      to_id: to,
      subject,
      type: MessageType.SENT,
      attachment: documentFiles,
    };

    sendMessage(payload);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setDocumentFiles([]);
      setOpenComposeModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isClickOutside) {
      setShowNotification(false);
      setIsClickOutside(false);
    }
  }, [isClickOutside]);

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('send-message-channel');
    channel.bind('send.message', (data: any) => {
      refetchNotifications();
    });

    return () => {
      pusher.unsubscribe('send-message-channel');
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
          <AccessWrapper>
            <strong>{accessType.toUpperCase()}</strong>
          </AccessWrapper>
          <LogoutWrapper>
            <IconWrapper>
              <NotificationContainer
                ref={ref}
                onClick={() => {
                  setShowNotification(!showNotification);
                  refetchNotifications();
                }}>
                <Badge
                  count={
                    notifications.filter(
                      (notification) => notification.status === 'unread',
                    ).length
                  }
                  size="small">
                  <div>
                    <BellOutlined style={{ fontSize: '16px' }} />
                  </div>
                </Badge>
                {showNotification && (
                  <NotificationContent>
                    {isFetchingNotifications ? (
                      <div style={{ margin: 'auto' }}>
                        <Spin size="small" />
                      </div>
                    ) : (
                      <>
                        {notifications.length === 0 ? (
                          <div>No notifications</div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              style={{
                                display: 'flex',
                                padding: '10px 0',
                                borderBottom: '1px solid #f0f0f0',
                                flexDirection: 'column',
                              }}
                              key={notification.id}
                              onClick={() => {
                                updateNotification({
                                  notificationId: notification.id,
                                  params: {
                                    status: NotificationStatus.READ,
                                  },
                                });
                                navigate(notification.url);
                              }}>
                              <span style={{ lineHeight: '24px' }}>
                                {notification.status ===
                                NotificationStatus.UNREAD ? (
                                  <b>{notification.message}</b>
                                ) : (
                                  notification.message
                                )}
                              </span>
                              <small style={{ lineHeight: '24px' }}>
                                {humanDateFormatter(
                                  notification.created_at
                                    ? notification.created_at.toLocaleString()
                                    : '',
                                )}
                              </small>
                            </div>
                          ))
                        )}
                      </>
                    )}
                  </NotificationContent>
                )}
              </NotificationContainer>
            </IconWrapper>
            {accessType === AccessType.Teacher ? (
              <Dropdown
                trigger={['click']}
                placement="bottomRight"
                menu={{
                  items: dropdownItems,
                }}>
                <AvatarWrapper>
                  <Avatar
                    size="large"
                    style={{ backgroundColor: '#f56a00' }}
                    src={`${BACKEND_URL}/${avatar}`}
                    icon={<UserOutlined />}
                  />
                </AvatarWrapper>
              </Dropdown>
            ) : (
              <AvatarWrapper onClick={() => navigate('/profile')}>
                <Avatar
                  size="large"
                  style={{ backgroundColor: '#f56a00' }}
                  src={`${BACKEND_URL}/${avatar}`}
                  icon={<UserOutlined />}
                />
              </AvatarWrapper>
            )}

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
        isLoading={isSendingMessage}
        centered
        okText="Send"
        title="Compose Message"
        open={openComposeModal}
        onSubmit={handleSubmit(onSendMessage)}
        onCancel={() => setOpenComposeModal(false)}>
        <Form layout="vertical">
          <ErrorMessage
            errors={errors}
            name="to"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="to"
            render={({ field: { onChange, value } }) => (
              <Form.Item label="To" name="to">
                <Select
                  status={errors.to ? 'error' : ''}
                  showSearch
                  filterOption={false}
                  notFoundContent={isFetching ? <Spin size="small" /> : null}
                  onSearch={handleSearch}
                  onChange={onChange}
                  value={value}
                  placeholder="Search user">
                  {users.data.map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.email}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="subject"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <Form.Item label="Subject" name="subject">
                <Input
                  status={errors.subject ? 'error' : ''}
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  status={errors.description ? 'error' : ''}
                  rows={6}
                  cols={6}
                  value={value}
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />

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
