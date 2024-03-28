import {
  Form,
  Select,
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
  UploadButton,
} from './elements';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';
import {
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { DocumentStatus, DocumentType } from '../types';
import { ErrorMessage } from '@hookform/error-message';
import { BACKEND_URL } from '@/config';

const { DirectoryTree } = Tree;
const { Item } = Form;
const { Dragger } = Upload;

const initTreeData: TreeDataNode[] = [
  {
    title: 'Office Documents',
    key: '0-0',
  },
  {
    title: 'Student Documents',
    key: '0-1',
  },
];

const ParentDirectoryOptions = [
  { label: 'Office Documents', value: 'office' },
  { label: 'Student Documents', value: 'student' },
];

type Props = {
  documents: FetchDocumentsResponseDTO[];
  onUploadDocuments: (data: UploadDocumentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  onUpdateDocument: (data: {
    id: string;
    request: UpdateDocumentRequestDTO;
  }) => void;
  isUpdatingDocument?: boolean;
};

const OfficeDocuments = ({
  onUploadDocuments,
  onUpdateDocument,
  isLoading,
  isSuccessful,
  documents,
  isUpdatingDocument,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [treeData, setTreeData] = useState<TreeDataNode[]>(initTreeData);
  const [pendingDocuments, setPendingDocuments] = useState<
    FetchDocumentsResponseDTO[]
  >([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      type: DocumentType.Office,
      resolver: yupResolver(validationSchema),
    },
  });

  const TableColumnData: TableProps<FetchDocumentsResponseDTO>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      key: 'type',
      render: (_, record) => record.type.toUpperCase(),
    },
    {
      title: 'File',
      key: 'file',
      render: (_, record) => (
        <a href={`${BACKEND_URL}/${record.file_path}`} download target="_blank">
          {record.name}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              onUpdateDocument({
                id: record.id,
                request: { status: DocumentStatus.Approved },
              })
            }>
            Approve
          </a>
          <a
            onClick={() =>
              onUpdateDocument({
                id: record.id,
                request: { status: DocumentStatus.Rejected },
              })
            }>
            Reject
          </a>
        </Space>
      ),
    },
  ];

  const handleUploadFile = (request: { type: string }) => {
    if (documentFiles.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const status =
      accessType === AccessType.Admin
        ? DocumentStatus.Approved
        : DocumentStatus.Pending;

    const data: UploadDocumentRequestDTO = {
      type: request.type as DocumentType,
      user_id: id,
      documents: documentFiles,
      status,
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
    if (documents.length > 0) {
      setTreeData((origin) => {
        const office = documents.filter(
          (document) =>
            document.type === DocumentType.Office &&
            document.status === DocumentStatus.Approved,
        );

        const student = documents.filter(
          (document) =>
            document.type === DocumentType.Student &&
            document.status === DocumentStatus.Approved,
        );

        origin[0].children = office.map((doc, index) => ({
          title: (
            <a
              href={`${BACKEND_URL}/${doc.file_path}`}
              download
              target="_blank">
              {doc.name}
            </a>
          ),
          key: `0-0-${index}`,
          isLeaf: true,
        }));

        origin[1].children = student.map((doc, index) => ({
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

        const pending = documents.filter((document) => {
          if (accessType === AccessType.Teacher) {
            return (
              document.type === DocumentType.Student &&
              document.status === DocumentStatus.Pending
            );
          }

          return document.status === DocumentStatus.Pending;
        });

        setPendingDocuments(pending);

        return origin;
      });
    }
  }, [documents]);

  return (
    <DocumentsWrapper>
      {contextHolder}
      <DocumentsHeader>
        <h1>Documents</h1>
        {accessType !== AccessType.Student && (
          <UploadButton
            size="large"
            type="primary"
            onClick={() => setOpenUploadDocumentsModal(true)}>
            Upload Documents
          </UploadButton>
        )}
      </DocumentsHeader>

      <div>
        <DirectoryTree
          showLine
          multiple
          selectable={false}
          treeData={treeData}
        />
      </div>

      {accessType !== AccessType.Student && (
        <div>
          <h2>Pending Documents</h2>
          <StyledTable
            columns={TableColumnData}
            rowKey="id"
            dataSource={pendingDocuments}
            loading={isUpdatingDocument}
          />
        </div>
      )}

      <Modal
        isLoading={isLoading}
        open={openUploadDocumentsModal}
        onSubmit={handleSubmit(handleUploadFile)}
        title="Upload Documents"
        onCancel={() => setOpenUploadDocumentsModal(false)}>
        <Form layout="vertical">
          <ErrorMessage
            name="type"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Item label="Parent Directory">
                <Select
                  status={errors.type && 'error'}
                  value={value}
                  onChange={onChange}
                  options={ParentDirectoryOptions}
                />
              </Item>
            )}
          />

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
