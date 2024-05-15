import { useEffect, useState } from 'react';
import {
  DocumentsHeader,
  DocumentsWrapper,
  ErrorWrapper,
  FileTextWrapper,
  FileWrapper,
  StyledTextArea,
  UploadButton,
} from './elements';
import {
  Button,
  Form,
  List,
  Popconfirm,
  Radio,
  Upload,
  UploadFile,
  message,
} from 'antd';
import {
  AddRequestToDocumentDTO,
  FetchDocumentsResponseDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { Modal } from '@/components/Elements/Modal';
import { useGlobalState } from '@/hooks/global';
import { DocumentStatus, DocumentType } from '../types';
import { AccessType } from '@/features/account/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { RcFile } from 'antd/es/upload';
import {
  DeleteOutlined,
  InboxOutlined,
  LockOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { BACKEND_URL } from '@/config';

const { Dragger } = Upload;

type Props = {
  documents: FetchDocumentsResponseDTO[];
  onUploadDocuments: (data: UploadDocumentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  onDeleteDocument: (id: string) => void;
  isDeletingDocument?: boolean;
  isRequestingDocument?: boolean;
  isRequestingDocumentSuccess?: boolean;
  onAddRequestToDocument: (data: AddRequestToDocumentDTO) => void;
};

const DocumentListChild = ({
  documents,
  onUploadDocuments,
  isLoading,
  isSuccessful,
  onDeleteDocument,
  isDeletingDocument,
  isRequestingDocument,
  isRequestingDocumentSuccess,
  onAddRequestToDocument,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [messageApi, contextHolder] = message.useMessage();

  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [mappedDocuments, setMappedDocuments] = useState<
    FetchDocumentsResponseDTO[]
  >([]);
  const [type, setType] = useState<DocumentType>(DocumentType.Office);
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] =
    useState<FetchDocumentsResponseDTO | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      is_private: false,
      type: 'office',
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit: onHandleSubmitRequest,
    control: controlRequest,
    reset: resetRequest,
  } = useForm({
    defaultValues: {
      reason: '',
    },
  });

  const handleUploadFile = (request: {
    type: string;
    is_private?: boolean;
  }) => {
    if (documentFiles.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const data: UploadDocumentRequestDTO = {
      type:
        accessType === AccessType.Admin
          ? type
          : accessType === AccessType.Teacher
          ? DocumentType.Teacher
          : DocumentType.Student,
      user_id: id,
      documents: documentFiles,
      status: DocumentStatus.Approved,
      is_private: request.is_private,
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

  const handleSubmitRequestDocument = (values: { reason?: string }) => {
    if (selectedDocument) {
      const data: AddRequestToDocumentDTO = {
        document_id: selectedDocument.id,
        user_id: id,
        reason: values.reason,
      };

      onAddRequestToDocument(data);
      resetRequest();
    }
  };

  useEffect(() => {
    if (documents && documents.length > 0) {
      const mappedDocuments = documents.filter(
        (document) => document.type === DocumentType.Document,
      );

      setMappedDocuments(mappedDocuments);
    }
  }, [documents]);

  useEffect(() => {
    if (isSuccessful) {
      setOpenUploadDocumentsModal(false);
      setDocumentFiles([]);
      reset();
    }
  }, [isSuccessful]);

  useEffect(() => {
    if (isRequestingDocumentSuccess) {
      setSelectedDocument(null);
      setOpenRequestModal(false);
      resetRequest();
    }
  }, [isRequestingDocumentSuccess]);

  useEffect(() => {
    const subscription = watch(({ type }) => {
      setType(type as DocumentType);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <DocumentsWrapper>
      {contextHolder}
      <DocumentsHeader>
        <h1>Documents</h1>
        <UploadButton
          size="large"
          type="primary"
          onClick={() => setOpenUploadDocumentsModal(true)}>
          Upload Documents
        </UploadButton>
      </DocumentsHeader>

      <div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={mappedDocuments}
          renderItem={(item) => (
            <List.Item>
              <FileWrapper>
                {item.is_private ? (
                  <a
                    onClick={() => {
                      setSelectedDocument(item);
                      setOpenRequestModal(true);
                    }}>
                    <FileTextWrapper>
                      <span>
                        <LockOutlined />
                      </span>
                      <FileWrapper>
                        <span style={{ wordBreak: 'break-word' }}>
                          {item.name}
                        </span>
                      </FileWrapper>
                    </FileTextWrapper>
                  </a>
                ) : (
                  <a
                    href={`${BACKEND_URL}/${item.file_path}`}
                    download
                    target="_blank">
                    <FileTextWrapper>
                      <span>
                        <PaperClipOutlined />
                      </span>
                      <FileWrapper>
                        <span style={{ wordBreak: 'break-word' }}>
                          {item.name}
                        </span>
                      </FileWrapper>
                    </FileTextWrapper>
                  </a>
                )}

                {accessType === AccessType.Admin && (
                  <Popconfirm
                    placement="topRight"
                    title="Delete document"
                    description="Are you sure you want to delete this document?"
                    okButtonProps={{ loading: isDeletingDocument }}
                    cancelButtonProps={{ loading: isDeletingDocument }}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      onDeleteDocument(item.id);
                    }}>
                    <Button
                      size="small"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      type="primary"
                      danger
                    />
                  </Popconfirm>
                )}
              </FileWrapper>
            </List.Item>
          )}
        />
      </div>

      <Modal
        isLoading={isRequestingDocument}
        open={openRequestModal}
        onSubmit={onHandleSubmitRequest(handleSubmitRequestDocument)}
        onCancel={() => setOpenRequestModal(false)}
        title="Request Document Access">
        <Form layout="vertical">
          <Controller
            control={controlRequest}
            name="reason"
            render={({ field: { onChange, value } }) => (
              <Form.Item label="Reason">
                <StyledTextArea onChange={onChange} value={value} rows={4} />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        isLoading={isLoading}
        open={openUploadDocumentsModal}
        onSubmit={handleSubmit(handleUploadFile)}
        title="Upload Documents"
        onCancel={() => setOpenUploadDocumentsModal(false)}>
        <Form layout="vertical">
          {accessType === AccessType.Admin && (
            <>
              <ErrorMessage
                name="type"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />

              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <Form.Item label="Document Type">
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value="office">Office</Radio>
                      <Radio value="document">Document</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
              />
            </>
          )}

          {accessType === AccessType.Admin &&
            type === DocumentType.Document && (
              <>
                <ErrorMessage
                  name="is_private"
                  errors={errors}
                  render={({ message }) => (
                    <ErrorWrapper>{message}</ErrorWrapper>
                  )}
                />

                <Controller
                  control={control}
                  name="is_private"
                  render={({ field: { onChange, value } }) => (
                    <Form.Item label="Confidentiality">
                      <Radio.Group onChange={onChange} value={value}>
                        <Radio value={false}>Public</Radio>
                        <Radio value={true}>Private</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </>
            )}

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

export default DocumentListChild;
