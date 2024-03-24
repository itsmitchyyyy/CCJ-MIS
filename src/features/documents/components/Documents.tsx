import { Form, Select, Tree, TreeDataNode, Upload, message } from 'antd';
import { DocumentsHeader, DocumentsWrapper, UploadButton } from './elements';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Modal } from '@/components/Elements/Modal';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';

const { DirectoryTree } = Tree;
const { Item } = Form;
const { Dragger } = Upload;

const treeData: TreeDataNode[] = [
  {
    title: 'Office Documents',
    key: '0-0',
    children: [
      {
        title: (
          <a href="/assets/react.svg" download>
            Test
          </a>
        ),
        key: '0-0-0',
        isLeaf: true,
      },
    ],
  },
  {
    title: 'Student Documents',
    key: '0-1',
    children: [
      {
        title: (
          <a href="/assets/react.svg" download>
            Test
          </a>
        ),
        key: '0-1-0',
        isLeaf: true,
      },
    ],
  },
];

const ParentDirectoryOptions = [
  { label: 'Office Documents', value: 'office' },
  { label: 'Student Documents', value: 'student' },
];

const OfficeDocuments = () => {
  const {
    useAuth: { accessType },
  } = useGlobalState();
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUploadFile = () => {
    console.log(documentFiles);
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    let isAllFilesValid = true;
    if (fileList.length > 0) {
      isAllFilesValid = fileList.every((file) => {
        const extension = file.name.split('.').pop() as string;
        console.log(extension);

        console.log(
          ['xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'pdf'].includes(
            extension,
          ),
        );

        return [
          'xlsx',
          'xls',
          'doc',
          'docx',
          'ppt',
          'pptx',
          'txt',
          'pdf',
        ].includes(extension);
      });
    }

    if (isAllFilesValid) {
      setDocumentFiles([...documentFiles, ...fileList]);
    } else {
      messageApi.error('Some files are invalid file type');
    }

    return false;
  };

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

      <Modal
        open={openUploadDocumentsModal}
        onSubmit={handleUploadFile}
        title="Upload Documents"
        onCancel={() => setOpenUploadDocumentsModal(false)}>
        <Form layout="vertical">
          <Item label="Parent Directory">
            <Select options={ParentDirectoryOptions} />
          </Item>

          <Dragger
            accept=".xlsx, .xls, .doc, .docx,.ppt, .pptx,.txt,.pdf"
            multiple
            beforeUpload={handleBeforeUploadFile}
            fileList={documentFiles}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form>
      </Modal>
    </DocumentsWrapper>
  );
};

export default OfficeDocuments;
