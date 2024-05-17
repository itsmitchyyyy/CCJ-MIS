import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { capitalizeStringWithSpace } from '@/utils/string';
import { FolderOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Input, List } from 'antd';
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
} from '@/core/domain/dto/document.dto';
import { BACKEND_URL } from '@/config';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addFolderValidationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  storedDocuments: string[];
  isFetchingStoredDocuments?: boolean;
  queriedDocuments: FetchDocumentsResponseDTO[];
  isFetchingQueriedDocuments?: boolean;
  onAddNewFolder: (data: AddNewFolderParams) => void;
  isAddingNewFolder?: boolean;
  isSuccessAddingNewFolder?: boolean;
};

const StoredDocuments = ({
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddingNewFolderModal, setIsAddingNewFolderModal] = useState(false);

  const q = searchParams.get('q');

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

  useEffect(() => {
    if (isSuccessAddingNewFolder) {
      setIsAddingNewFolderModal(false);
      reset();
    }
  });

  return (
    <DocumentsWrapper>
      <DocumentsHeader>
        <h2>Stored Documents</h2>
        {accessType === AccessType.Teacher && (
          <UploadButton
            style={{ alignItems: 'center' }}
            size="large"
            onClick={() => setIsAddingNewFolderModal(true)}
            icon={<FolderOutlined />}>
            New Folder
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
    </DocumentsWrapper>
  );
};

export default StoredDocuments;
