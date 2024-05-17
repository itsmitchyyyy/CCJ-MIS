import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { capitalizeStringWithSpace } from '@/utils/string';
import {
  FolderOutlined,
  InboxOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  List,
  Upload,
  UploadFile,
  message,
} from 'antd';
import { useSearchParams } from 'react-router-dom';
import {
  DocumentsHeader,
  DocumentsWrapper,
  ErrorWrapper,
  UploadButton,
} from './elements';
import {
  AddNewFolderParams,
  FetchDocumentsResponseDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { BACKEND_URL } from '@/config';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addFolderValidationSchema,
  uploadValidationSchema,
} from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { RcFile } from 'antd/es/upload';
import { DocumentStatus, DocumentType } from '../types';

const { Dragger } = Upload;

type Props = {
  storedDocuments: string[];
  isFetchingStoredDocuments?: boolean;
  queriedDocuments: FetchDocumentsResponseDTO[];
  isFetchingQueriedDocuments?: boolean;
  onAddNewFolder: (data: AddNewFolderParams) => void;
  isAddingNewFolder?: boolean;
  isSuccessAddingNewFolder?: boolean;
  onUploadDocuments: (data: UploadDocumentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
};

const StoredDocuments = ({
  storedDocuments,
  isFetchingStoredDocuments,
  queriedDocuments,
  isFetchingQueriedDocuments,
  onAddNewFolder,
  isAddingNewFolder,
  isSuccessAddingNewFolder,
  onUploadDocuments,
  isLoading,
  isSuccessful,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddingNewFolderModal, setIsAddingNewFolderModal] = useState(false);

  const q = searchParams.get('q');

  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);

  const handleDocumentClick = (document: string) => {
    setSearchParams({ q: document });
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folderName: '',
    },
    resolver: yupResolver(addFolderValidationSchema),
  });

  const handleSubmitAddNewFolder = (data: { folderName: string }) => {
    const params: AddNewFolderParams = {
      folder_name: data.folderName,
      user_id: id,
    };

    onAddNewFolder(params);
  };

  const { handleSubmit: handleSubmitUpload, reset: resetUpload } = useForm({
    defaultValues: {
      type: accessType as 'teacher' | 'student',
    },
    resolver: yupResolver(uploadValidationSchema),
  });

  const handleUploadFile = (request: { type: string }) => {
    if (documentFiles.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const data: UploadDocumentRequestDTO = {
      type:
        accessType === AccessType.Teacher
          ? DocumentType.Teacher
          : DocumentType.Student,
      user_id: id,
      documents: documentFiles,
      folder_type: q || undefined,
      status: DocumentStatus.Approved,
    };

    onUploadDocuments(data);
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    let isAllFilesValid = true;
    if (fileList.length > 0) {
      isAllFilesValid = fileList.every((file) => {
        const extension = file.name.split('.').pop() as string;

        return [
          'xlsx',
          'xls',
          'doc',
          'docx',
          'ppt',
          'pptx',
          'txt',
          'pdf',
        ].includes(extension.toLowerCase());
      });
    }

    if (isAllFilesValid) {
      setDocumentFiles([...documentFiles, ...fileList]);
    } else {
      messageApi.error('Some files are invalid file type');
    }

    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = documentFiles.indexOf(file);
    const newDocumentFiles = documentFiles.slice();
    newDocumentFiles.splice(index, 1);
    setDocumentFiles(newDocumentFiles);
  };

  useEffect(() => {
    if (isSuccessAddingNewFolder) {
      setIsAddingNewFolderModal(false);
      reset();
    }
  });

  useEffect(() => {
    if (isSuccessful) {
      setOpenUploadDocumentsModal(false);
      setDocumentFiles([]);
      resetUpload();
    }
  }, [isSuccessful]);

  return (
    <DocumentsWrapper>
      {contextHolder}
      <DocumentsHeader>
        <h2>Stored Documents</h2>
        {accessType === AccessType.Teacher && !q && (
          <UploadButton
            style={{ alignItems: 'center' }}
            size="large"
            onClick={() => setIsAddingNewFolderModal(true)}
            icon={<FolderOutlined />}>
            New Folder
          </UploadButton>
        )}
        {accessType !== AccessType.Admin && q && (
          <UploadButton
            size="large"
            type="primary"
            onClick={() => setOpenUploadDocumentsModal(true)}>
            Upload Documents
          </UploadButton>
        )}
      </DocumentsHeader>

      {accessType !== AccessType.Admin && !q && (
        <List
          style={{ marginTop: '2em' }}
          loading={isFetchingStoredDocuments}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
          dataSource={storedDocuments}
          renderItem={(item) => (
            <List.Item>
              <Button
                onClick={() => handleDocumentClick(item)}
                size="large"
                type="primary"
                style={{
                  width: '200px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                icon={<FolderOutlined />}>
                <span style={{ display: 'inline' }}>
                  {capitalizeStringWithSpace(item.replace(/_/g, ' '))}
                </span>
              </Button>
            </List.Item>
          )}
        />
      )}

      {q && (
        <DocumentsWrapper>
          <DocumentsHeader>
            <Breadcrumb
              style={{ fontSize: '1.2em' }}
              items={[
                {
                  title: <a>Back</a>,
                  onClick: () => setSearchParams({ q: '' }),
                },
                { title: capitalizeStringWithSpace(q.replace(/_/g, ' ')) },
              ]}
            />
          </DocumentsHeader>

          <List
            style={{ marginTop: '2em' }}
            loading={isFetchingQueriedDocuments}
            dataSource={queriedDocuments}
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
            renderItem={(item) => (
              <List.Item>
                <Button
                  download
                  target="_blank"
                  href={`${BACKEND_URL}/${item.file_path}`}
                  type="link"
                  style={{
                    width: '200px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  icon={<PaperClipOutlined />}>
                  <span style={{ display: 'inline' }}>{item.name}</span>
                </Button>
              </List.Item>
            )}
          />
        </DocumentsWrapper>
      )}

      <Modal
        isLoading={isAddingNewFolder}
        open={isAddingNewFolderModal}
        title=" New Folder"
        onCancel={() => setIsAddingNewFolderModal(false)}
        onSubmit={handleSubmit(handleSubmitAddNewFolder)}>
        <Form layout="vertical" style={{ marginTop: '1em' }}>
          <ErrorMessage
            errors={errors}
            name="folderName"
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />

          <Controller
            control={control}
            name="folderName"
            render={({ field: { onChange, value } }) => (
              <Form.Item>
                <Input
                  status={errors.folderName && 'error'}
                  size="large"
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        isLoading={isLoading}
        open={openUploadDocumentsModal}
        onSubmit={handleSubmitUpload(handleUploadFile)}
        title="Upload Documents"
        onCancel={() => setOpenUploadDocumentsModal(false)}>
        <Form layout="vertical">
          <Dragger
            accept=".xlsx, .xls, .doc, .docx,.ppt, .pptx,.txt,.pdf"
            multiple
            beforeUpload={handleBeforeUploadFile}
            onRemove={handleOnRemoveFile}
            fileList={documentFiles}>
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
    </DocumentsWrapper>
  );
};

export default StoredDocuments;
