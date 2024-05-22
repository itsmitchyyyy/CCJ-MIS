import {
  AddAnnouncementButton,
  AnnouncementHeader,
  AnnouncementListContainer,
  AnnouncementWrapper,
  ErrorWrapper,
  StyledTextArea,
} from '@/features/announcement/components/elements';
import {
  StyledCard,
  StyledList,
  StyledText,
  Wrapper,
  WrapperContainer,
} from './elements';
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  List,
  Popconfirm,
  Radio,
  Row,
  UploadFile,
  message,
} from 'antd';
import { BACKEND_URL } from '@/config';
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { Announcement, AnnouncementType } from '@/features/announcement/types';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/Elements/Modal';
import { Setting, SettingRequest } from '@/core/domain/dto/settings.dto';
import { Controller, useForm } from 'react-hook-form';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import Upload, { RcFile } from 'antd/es/upload';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/features/announcement/components/validation';
import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';
import { ErrorMessage } from '@hookform/error-message';
import { colors } from '@/constants/themes';

const { Dragger } = Upload;

type DashboardDetailsProps = {
  isFetchingAnnouncements?: boolean;
  announcements: Announcement[];
  setting: Setting;
  isLoadingSetting?: boolean;
  onSubmitSetting: (params: SettingRequest) => void;
  isSubmittingSetting?: boolean;
  isSuccessfullySubmittedSetting?: boolean;
  onCreateAnnouncement: (data: StoreAnnouncementDTO) => void;
  isCreatingAnnouncement?: boolean;
  isSuccessfullyCreated?: boolean;
  onDeleteAnnouncement: (id: string) => void;
  isDeletingAnnouncement?: boolean;
};

const DashboardDetails = ({
  announcements,
  isFetchingAnnouncements,
  setting,
  isLoadingSetting,
  onSubmitSetting,
  isSubmittingSetting,
  isSuccessfullySubmittedSetting,
  onCreateAnnouncement,
  isCreatingAnnouncement,
  isSuccessfullyCreated,
  isDeletingAnnouncement,
  onDeleteAnnouncement,
}: DashboardDetailsProps) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();

  const [isEditVision, setIsEditVision] = useState(false);
  const [isEditMission, setIsEditMission] = useState(false);
  const [addAnnounceModalVisibile, setAddAnnounceModalVisibile] =
    useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control: controlVision,
    handleSubmit: handleSubmitVision,
    reset: resetVision,
  } = useForm();

  const {
    control: controlMission,
    handleSubmit: handleSubmitMission,
    reset: resetMission,
  } = useForm();

  const {
    control: controlAnnouncement,
    handleSubmit: handleSubmitAnnouncement,
    formState: { errors: errorsAnnouncement },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
      type: AnnouncementType.All,
    },
  });

  useEffect(() => {
    if (setting) {
      resetVision({ vision: setting.vision });
      resetMission({ mission: setting.mission });
    }
  }, [setting]);

  const handleSubmitSetting = (data: { vision?: string; mission?: string }) => {
    const { vision, mission } = data;

    const settingRequest: SettingRequest = {
      vision: (vision || setting.vision) as string,
      mission: (mission || setting.mission) as string,
    };

    onSubmitSetting(settingRequest);
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    let isAllFilesValid = true;
    if (fileList.length > 0) {
      isAllFilesValid = fileList.every((file) => {
        const extension = file.name.split('.').pop() as string;

        return ['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase());
      });
    }

    if (isAllFilesValid) {
      setImageFiles([...imageFiles, ...fileList]);
    } else {
      messageApi.error('Some files are invalid file type');
    }

    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = imageFiles.indexOf(file);
    const newImageFiles = imageFiles.slice();
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const onHandleSubmitAnnouncement = (data: {
    title: string;
    description: string;
    type: AnnouncementType;
  }) => {
    onCreateAnnouncement({
      ...data,
      images: imageFiles,
      posted_by_id: id,
    });
  };

  useEffect(() => {
    if (isSuccessfullySubmittedSetting) {
      setIsEditVision(false);
      setIsEditMission(false);
      resetVision();
      resetMission();
    }
  }, [isSuccessfullySubmittedSetting]);

  useEffect(() => {
    if (isSuccessfullyCreated) {
      setAddAnnounceModalVisibile(false);
      setImageFiles([]);
      reset();
    }
  }, [isSuccessfullyCreated]);

  return (
    <WrapperContainer>
      <Wrapper>
        <StyledCard
          title="Vision"
          bordered={false}
          isLoading={isLoadingSetting}
          actions={
            accessType === AccessType.Admin
              ? [
                  <EditOutlined
                    onClick={() => {
                      setIsEditVision(true);
                    }}
                    key="edit"
                  />,
                ]
              : []
          }>
          <StyledText>{setting.vision}</StyledText>
        </StyledCard>

        <StyledCard
          title="Mission"
          bordered={false}
          isLoading={isLoadingSetting}
          actions={
            accessType === AccessType.Admin
              ? [
                  <EditOutlined
                    onClick={() => {
                      setIsEditMission(true);
                    }}
                    key="edit"
                  />,
                ]
              : []
          }>
          <StyledText>{setting.mission}</StyledText>
        </StyledCard>
      </Wrapper>

      <AnnouncementWrapper>
        {contextHolder}
        <AnnouncementHeader>
          <h1>Announcements</h1>

          {accessType === AccessType.Admin && (
            <AddAnnouncementButton
              onClick={() => setAddAnnounceModalVisibile(true)}
              type="primary"
              size="large">
              Add Announcement
            </AddAnnouncementButton>
          )}
        </AnnouncementHeader>
      </AnnouncementWrapper>

      <AnnouncementListContainer>
        <StyledList
          loading={isFetchingAnnouncements}
          size="large"
          dataSource={announcements}
          itemLayout="vertical"
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={
                accessType === AccessType.Admin
                  ? [
                      <Popconfirm
                        placement="topRight"
                        title="Delete announcement"
                        description="Are you sure you want to delete this announcement?"
                        okText="Yes"
                        cancelText="No"
                        icon={
                          <DeleteOutlined
                            style={{ color: colors.keyColors.danger }}
                          />
                        }
                        okButtonProps={{ loading: isDeletingAnnouncement }}
                        cancelButtonProps={{ loading: isDeletingAnnouncement }}
                        onConfirm={() => onDeleteAnnouncement(item.id)}>
                        <Button
                          disabled={isDeletingAnnouncement}
                          type="text"
                          shape="default"
                          danger
                          icon={<DeleteOutlined />}
                        />
                      </Popconfirm>,
                    ]
                  : undefined
              }
              extra={
                item.images?.length ? (
                  <Image.PreviewGroup
                    items={announcements.reduce((acc: string[], curr) => {
                      if (curr.images) {
                        curr.images.forEach((image) => {
                          acc.push(`${BACKEND_URL}/${image}`);
                        });
                      }
                      return acc;
                    }, [])}>
                    <Image
                      width={200}
                      src={`${BACKEND_URL}/${item.images[0]}`}
                    />
                  </Image.PreviewGroup>
                ) : null
              }>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    src={`${BACKEND_URL}/${item.posted_by.profile_picture}`}
                  />
                }
                title={<a href="#">{item.title}</a>}
                description={`Posted by ${item.posted_by.first_name} ${
                  item.posted_by.last_name
                } - ${formatDate(
                  item.posted_at.toString(),
                  'MMMM DD, YYYY h:mm A',
                )}`}
              />
              {item.description}
            </List.Item>
          )}
        />
      </AnnouncementListContainer>

      <Modal
        isLoading={isCreatingAnnouncement}
        title="Add Announcement"
        open={addAnnounceModalVisibile}
        onCancel={() => setAddAnnounceModalVisibile(false)}
        onSubmit={handleSubmitAnnouncement(onHandleSubmitAnnouncement)}>
        <Form layout="vertical">
          <ErrorMessage
            errors={errorsAnnouncement}
            name="type"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />

          <Controller
            control={controlAnnouncement}
            name="type"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Type" required>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={AnnouncementType.All}>All</Radio>
                  <Radio value={AnnouncementType.Student}>Student</Radio>
                  <Radio value={AnnouncementType.Teacher}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          />

          <ErrorMessage
            errors={errorsAnnouncement}
            name="title"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlAnnouncement}
            name="title"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Title" required>
                <Input
                  value={value}
                  size="large"
                  onChange={onChange}
                  status={errorsAnnouncement.title && 'error'}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            errors={errorsAnnouncement}
            name="description"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlAnnouncement}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Description" required>
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  size="large"
                  onChange={onChange}
                  status={errorsAnnouncement.description && 'error'}
                />
              </Form.Item>
            )}
          />

          <Dragger
            accept="image/*"
            multiple
            beforeUpload={handleBeforeUploadFile}
            onRemove={handleOnRemoveFile}
            fileList={imageFiles}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              banned files.
            </p>
          </Dragger>
        </Form>
      </Modal>

      <Modal
        title={`Edit Vision`}
        open={isEditVision}
        isLoading={isSubmittingSetting}
        onCancel={() => setIsEditVision(false)}
        onSubmit={handleSubmitVision(handleSubmitSetting)}>
        <Form layout="vertical">
          <Controller
            name="vision"
            control={controlVision}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Vision">
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  onChange={onChange}
                  placeholder={`Enter vision`}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        title={`Edit Mission`}
        open={isEditMission}
        isLoading={isSubmittingSetting}
        onCancel={() => setIsEditMission(false)}
        onSubmit={handleSubmitMission(handleSubmitSetting)}>
        <Form layout="vertical">
          <Controller
            name="mission"
            control={controlMission}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Mission">
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  onChange={onChange}
                  placeholder={`Enter mission`}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </WrapperContainer>
  );
};

export { DashboardDetails };
