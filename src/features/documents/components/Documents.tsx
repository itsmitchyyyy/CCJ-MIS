import { Tree, TreeDataNode } from 'antd';
import { DocumentsHeader, DocumentsWrapper, UploadButton } from './elements';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';

const { DirectoryTree } = Tree;

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

const OfficeDocuments = () => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  return (
    <DocumentsWrapper>
      <DocumentsHeader>
        <h1>Documents</h1>
        {accessType !== AccessType.Student && (
          <UploadButton size="large" type="primary">
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
    </DocumentsWrapper>
  );
};

export default OfficeDocuments;
