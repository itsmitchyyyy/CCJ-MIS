import { Avatar, Form, Input, List, Upload, message } from 'antd';
import {
  AddAnnouncementButton,
  AnnouncementHeader,
  AnnouncementListContainer,
  AnnouncementWrapper,
  ErrorWrapper,
  StyledTextArea,
} from './elements';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/Elements/Modal';
import { Controller, useForm } from 'react-hook-form';
import { validationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { RcFile, UploadFile } from 'antd/es/upload';
import { InboxOutlined } from '@ant-design/icons';
import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';
import { useGlobalState } from '@/hooks/global';

const { Dragger } = Upload;

type AnnouncementProps = {
  onCreateAnnouncement: (data: StoreAnnouncementDTO) => void;
  isCreatingAnnouncement?: boolean;
  isSuccessfullyCreated?: boolean;
};

const Announcement = ({
  onCreateAnnouncement,
  isCreatingAnnouncement,
  isSuccessfullyCreated,
}: AnnouncementProps) => {
  const {
    useAuth: { id },
  } = useGlobalState();
  const [addAnnounceModalVisibile, setAddAnnounceModalVisibile] =
    useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

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
  }) => {
    onCreateAnnouncement({
      ...data,
      images: imageFiles,
      posted_by_id: id,
    });
  };

  useEffect(() => {
    if (isSuccessfullyCreated) {
      setAddAnnounceModalVisibile(false);
      setImageFiles([]);
      reset();
    }
  }, [isSuccessfullyCreated]);

  return (
    <AnnouncementWrapper>
      {contextHolder}
      <AnnouncementHeader>
        <h1>Announcements</h1>

        <AddAnnouncementButton
          onClick={() => setAddAnnounceModalVisibile(true)}
          type="primary"
          size="large">
          Add Announcement
        </AddAnnouncementButton>
      </AnnouncementHeader>

      <AnnouncementListContainer>
        <List
          size="large"
          itemLayout="vertical"
          renderItem={(item) => (
            <List.Item
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                }
                title={<a href="#">Wew</a>}
                description="wew"
              />
              Test
            </List.Item>
          )}
        />
      </AnnouncementListContainer>

      <Modal
        isLoading={isCreatingAnnouncement}
        title="Add Announcement"
        open={addAnnounceModalVisibile}
        onCancel={() => setAddAnnounceModalVisibile(false)}
        onSubmit={handleSubmit(onHandleSubmitAnnouncement)}>
        <Form layout="vertical">
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Title" required>
                <Input
                  value={value}
                  size="large"
                  onChange={onChange}
                  status={errors.title && 'error'}
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
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Description" required>
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  size="large"
                  onChange={onChange}
                  status={errors.description && 'error'}
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
    </AnnouncementWrapper>
  );
};

export default Announcement;
