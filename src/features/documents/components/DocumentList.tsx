import {
  Collapse,
  CollapseProps,
  Form,
  Radio,
  Upload,
  UploadFile,
  message,
} from 'antd';
import {
  DocumentsHeader,
  DocumentsWrapper,
  ErrorWrapper,
  UploadButton,
} from './elements';
import RequestList from './RequestList';
import {
  AddNewFolderParams,
  AddRequestToDocumentDTO,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import DocumentListChild from './DocumentListChild';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import MyRequestList from './MyRequestList';
import StoredDocuments from './StoredDocuments';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { DocumentStatus, DocumentType } from '../types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type Props = {
  // document list props
  documents: FetchDocumentsResponseDTO[];
  onUploadDocuments: (data: UploadDocumentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  // Request list props
  isFetchingDocumentRequests?: boolean;
  documentRequests: FetchDocumentRequestsResponseDTO[];
  isUpdatingDocumentRequest?: boolean;
  isUpdateDocumentRequestSuccess?: boolean;
  onUpdateDocumentRequest: (data: {
    id: string;
    params: UpdateDocumentRequestDTO;
  }) => void;
  onDeleteDocument: (id: string) => void;
  isDeletingDocument?: boolean;
  isRequestingDocument?: boolean;
  isRequestingDocumentSuccess?: boolean;
  onAddRequestToDocument: (data: AddRequestToDocumentDTO) => void;
  // stored documents props
  storedDocuments: string[];
  isFetchingStoredDocuments: boolean;
  queriedDocuments: FetchDocumentsResponseDTO[];
  isFetchingQueriedDocuments?: boolean;
  onAddNewFolder: (data: AddNewFolderParams) => void;
  isAddingNewFolder?: boolean;
  isSuccessAddingNewFolder?: boolean;
};

const DocumentList = ({
  documents,
  onUploadDocuments,
  isLoading,
  isSuccessful,
  isFetchingDocumentRequests,
  documentRequests,
  isUpdatingDocumentRequest,
  isUpdateDocumentRequestSuccess,
  onUpdateDocumentRequest,
  onDeleteDocument,
  isDeletingDocument,
  isRequestingDocument,
  isRequestingDocumentSuccess,
  onAddRequestToDocument,
  storedDocuments,
  isFetchingStoredDocuments,
  queriedDocuments,
  isFetchingQueriedDocuments,
  onAddNewFolder,
  isAddingNewFolder,
  isSuccessAddingNewFolder,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [messageApi, contextHolder] = message.useMessage();

  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [type, setType] = useState<DocumentType>(DocumentType.Office);

  const documentItems: CollapseProps['items'] = [
    {
      key: 'document_list',
      label: <b>Document List</b>,
      children: (
        <DocumentListChild
          isRequestingDocument={isRequestingDocument}
          isRequestingDocumentSuccess={isRequestingDocumentSuccess}
          onAddRequestToDocument={onAddRequestToDocument}
          documents={documents}
          onDeleteDocument={onDeleteDocument}
          isDeletingDocument={isDeletingDocument}
        />
      ),
    },
    {
      key: 'request_list',
      label: (
        <b>{accessType === AccessType.Admin ? 'Request List' : 'My Request'}</b>
      ),
      children:
        accessType === AccessType.Admin ? (
          <RequestList
            isFetchingDocumentRequests={isFetchingDocumentRequests}
            documentRequests={documentRequests}
            isUpdatingDocumentRequest={isUpdatingDocumentRequest}
            isUpdateDocumentRequestSuccess={isUpdateDocumentRequestSuccess}
            onUpdateDocumentRequest={onUpdateDocumentRequest}
          />
        ) : (
          <MyRequestList
            documentRequests={documentRequests}
            isFetchingDocumentRequests={isFetchingDocumentRequests}
          />
        ),
    },
    {
      key: 'stored_documents',
      label: (
        <b>
          {accessType === AccessType.Admin
            ? 'Stored Documents'
            : 'My Documents'}
        </b>
      ),
      children: (
        <StoredDocuments
          storedDocuments={storedDocuments}
          isFetchingStoredDocuments={isFetchingStoredDocuments}
          isFetchingQueriedDocuments={isFetchingQueriedDocuments}
          queriedDocuments={queriedDocuments}
          onAddNewFolder={onAddNewFolder}
          isAddingNewFolder={isAddingNewFolder}
          isSuccessAddingNewFolder={isSuccessAddingNewFolder}
          onUploadDocuments={onUploadDocuments}
          isLoading={isLoading}
          isSuccessful={isSuccessful}
        />
      ),
    },
  ];

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

  useEffect(() => {
    if (isSuccessful) {
      setOpenUploadDocumentsModal(false);
      setDocumentFiles([]);
      reset();
    }
  }, [isSuccessful]);

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
        {accessType === AccessType.Admin && (
          <UploadButton
            size="large"
            type="primary"
            onClick={() => setOpenUploadDocumentsModal(true)}>
            Upload Documents
          </UploadButton>
        )}
      </DocumentsHeader>

      <div>
        <Collapse ghost items={documentItems} />
      </div>

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

export default DocumentList;
