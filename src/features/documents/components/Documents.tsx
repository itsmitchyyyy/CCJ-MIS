import {
  Form,
  Radio,
  Space,
  TableProps,
  Tree,
  TreeDataNode,
  Upload,
  message,
} from 'antd';
import {
  DocumentsHeader,
  DocumentsWrapper,
  ErrorWrapper,
  StyledTable,
  StyledTextArea,
  UploadButton,
} from './elements';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { InboxOutlined, LockOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';
import {
  AddRequestToDocumentDTO,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { DocumentRequestStatus, DocumentStatus, DocumentType } from '../types';
import { BACKEND_URL } from '@/config';
import { ErrorMessage } from '@hookform/error-message';

const { DirectoryTree } = Tree;
const { Dragger } = Upload;

type Props = {
  documents: FetchDocumentsResponseDTO[];
  onUploadDocuments: (data: UploadDocumentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  isRequestingDocument?: boolean;
  isRequestingDocumentSuccess?: boolean;
  onAddRequestToDocument: (data: AddRequestToDocumentDTO) => void;
  isFetchingDocumentRequests?: boolean;
  documentRequests: FetchDocumentRequestsResponseDTO[];
  isUpdatingDocumentRequest?: boolean;
  onUpdateDocumentRequest: (data: {
    id: string;
    params: UpdateDocumentRequestDTO;
  }) => void;
};

const OfficeDocuments = ({
  onUploadDocuments,
  isLoading,
  isSuccessful,
  documents,
  isRequestingDocument,
  isRequestingDocumentSuccess,
  onAddRequestToDocument,
  isFetchingDocumentRequests,
  documentRequests,
  isUpdatingDocumentRequest,
  onUpdateDocumentRequest,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();

  const initTreeData: TreeDataNode[] = [
    {
      title: 'Office Documents',
      key: '0-0',
    },
    {
      title:
        accessType !== AccessType.Teacher
          ? 'Teacher Documents'
          : 'Student Documents',
      key: '0-1',
    },
    {
      title:
        accessType === AccessType.Admin ? 'Student Documents' : 'My Documents',
      key: '0-2',
    },
  ];

  if (accessType !== AccessType.Admin) {
    initTreeData.splice(1, 1);
  }

  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [treeData, setTreeData] = useState<TreeDataNode[]>(initTreeData);
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] =
    useState<FetchDocumentsResponseDTO | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_private: false,
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

  const TableColumnData: TableProps<FetchDocumentRequestsResponseDTO>['columns'] =
    [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Requestor',
        key: 'requestor',
        render: (_, record) =>
          `${record.user.first_name} ${record.user.last_name}`,
      },
      {
        title: 'File',
        key: 'file',
        render: (_, record) => (
          <a
            href={`${BACKEND_URL}/${record.document.file_path}`}
            download
            target="_blank">
            {record.document.name}
          </a>
        ),
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() =>
                onUpdateDocumentRequest({
                  id: record.id,
                  params: { status: DocumentStatus.Approved },
                })
              }>
              Approve
            </a>
            <a
              onClick={() =>
                onUpdateDocumentRequest({
                  id: record.id,
                  params: {
                    status: DocumentStatus.Rejected,
                  },
                })
              }>
              Reject
            </a>
          </Space>
        ),
      },
    ];

  const handleUploadFile = (request: { is_private: boolean }) => {
    if (documentFiles.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const data: UploadDocumentRequestDTO = {
      type:
        accessType === AccessType.Admin
          ? DocumentType.Office
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
    if (isSuccessful) {
      setOpenUploadDocumentsModal(false);
      setDocumentFiles([]);
    }
  }, [isSuccessful]);

  useEffect(() => {
    if (isRequestingDocumentSuccess) {
      setOpenRequestModal(false);
    }
  }, [isRequestingDocumentSuccess]);

  useEffect(() => {
    if (documents.length > 0) {
      setTreeData((origin) => {
        const office = documents.filter(
          (document) =>
            document.type === DocumentType.Office &&
            document.status === DocumentStatus.Approved,
        );

        const studentOrTeacherDocs = documents.filter(
          (document) =>
            document.type ===
              (accessType !== AccessType.Teacher
                ? DocumentType.Teacher
                : DocumentType.Student) &&
            document.status === DocumentStatus.Approved,
        );

        const myDocuments = documents.filter((document) => {
          const isValid =
            document.status === DocumentStatus.Approved &&
            document.type ===
              (accessType !== AccessType.Teacher
                ? DocumentType.Student
                : DocumentType.Teacher);

          if (accessType === AccessType.Admin) {
            return isValid;
          }

          return document.user_id === id && isValid;
        });

        origin[0].children = office.map((doc, index) => {
          const approvedRequest =
            documentRequests.findIndex(
              (element) =>
                element.document_id === doc.id &&
                element.user_id === id &&
                element.status === DocumentRequestStatus.Approved,
            ) !== -1;

          return {
            title:
              doc.is_private &&
              accessType !== AccessType.Admin &&
              !approvedRequest ? (
                <a
                  onClick={() => {
                    setSelectedDocument(doc);
                    setOpenRequestModal(true);
                  }}>
                  {doc.name}
                </a>
              ) : (
                <a
                  href={`${BACKEND_URL}/${doc.file_path}`}
                  download
                  target="_blank">
                  {doc.name}
                </a>
              ),
            key: `0-0-${index}`,
            icon:
              doc.is_private &&
              accessType !== AccessType.Admin &&
              !approvedRequest ? (
                <LockOutlined />
              ) : undefined,
            isLeaf: true,
          };
        });

        if (accessType === AccessType.Admin) {
          origin[1].children = studentOrTeacherDocs.map((doc, index) => ({
            title: (
              <a
                href={`${BACKEND_URL}/${doc.file_path}`}
                download
                target="_blank">
                {doc.name}
              </a>
            ),
            key: `0-1-${index}`,
            isLeaf: true,
          }));
        }

        origin[accessType !== AccessType.Admin ? 1 : 2].children =
          myDocuments.map((doc, index) => ({
            title: (
              <a
                href={`${BACKEND_URL}/${doc.file_path}`}
                download
                target="_blank">
                {doc.name}
              </a>
            ),
            key: `0-2-${index}`,
            isLeaf: true,
          }));

        return origin;
      });
    }
  }, [documents, documentRequests]);

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
        <DirectoryTree
          showLine
          multiple
          selectable={false}
          treeData={treeData}
        />
      </div>

      {accessType === AccessType.Admin && (
        <div>
          <h2>Documents Request</h2>
          <StyledTable
            columns={TableColumnData}
            rowKey="id"
            loading={isFetchingDocumentRequests || isUpdatingDocumentRequest}
            dataSource={documentRequests}
          />
        </div>
      )}

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
                name="is_private"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
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

export default OfficeDocuments;
