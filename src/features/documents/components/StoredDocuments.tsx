import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { capitalizeString, capitalizeStringWithSpace } from '@/utils/string';
import {
  FolderOutlined,
  InboxOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Flex,
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
  FilterWrapper,
  UploadButton,
} from './elements';
import {
  AddNewFolderParams,
  FetchDocumentsResponseDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { BACKEND_URL } from '@/config';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addFolderValidationSchema,
  uploadValidationSchema,
} from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { RcFile } from 'antd/es/upload';
import { DocumentStatus, DocumentType } from '../types';
import { FetchStudentsResponseDTO } from '@/core/domain/dto/student.dto';
import { FetchTeachersResponseDTO } from '@/core/domain/dto/user.dto';

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
  students: FetchStudentsResponseDTO[];
  isFetchingStudents?: boolean;
  teachers: FetchTeachersResponseDTO[];
  isFetchingTeachers?: boolean;
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
  students,
  isFetchingStudents,
  teachers,
  isFetchingTeachers,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddingNewFolderModal, setIsAddingNewFolderModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get('search') || '',
  );

  const q = searchParams.get('q');
  const type = searchParams.get('type');
  const userId = searchParams.get('user_id');

  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [openUploadDocumentsModal, setOpenUploadDocumentsModal] =
    useState<boolean>(false);
  const [isFolder, setIsFolder] = useState<boolean>(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const handleDocumentClick = (document: string) => {
    if (accessType === AccessType.Admin) {
      searchParams.set('q', document);
      searchParams.set('type', type || 'office');
    } else {
      searchParams.set('q', document);
    }

    setSearchParams(searchParams);
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

  const handleUploadFile = () => {
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

  const handleSearch = (keyword: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(keyword);
    }, 300);
  };

  const performSearch = (keyword: string) => {
    searchParams.set('search', keyword);

    setSearchParams(searchParams);
  };

  const getUserInfo = (id: string, type: string) => {
    if (type === 'student') {
      return students.find((student) => student.id.toString() === id);
    }

    return teachers.find((teacher) => teacher.id.toString() === id);
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

  useEffect(() => {
    if (q) {
      const hasFolder = storedDocuments.includes(q);
      setIsFolder(hasFolder);
    }
  }, [q]);

  // Cleanup the search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DocumentsWrapper>
      {contextHolder}
      <DocumentsHeader>
        <h2>Stored Documents</h2>
        {accessType !== AccessType.Student && !q && (
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

      {accessType === AccessType.Admin && (
        <>
          <Flex
            wrap="wrap"
            gap="large"
            justify="space-evenly"
            style={{ marginTop: '2em', marginBottom: '2em' }}>
            <Button
              style={{ minWidth: '200px' }}
              onClick={() => {
                setSearchParams({ type: 'student' });
                setSearchValue('');
              }}
              size="large"
              type={type === 'student' ? 'primary' : undefined}>
              Student
            </Button>

            <Button
              style={{ minWidth: '200px' }}
              onClick={() => {
                setSearchParams({ type: 'teacher' });
                setSearchValue('');
              }}
              size="large"
              type={type === 'teacher' ? 'primary' : undefined}>
              Teacher
            </Button>

            <Button
              style={{ minWidth: '200px' }}
              onClick={() => {
                setSearchParams({ type: 'office' });
                setSearchValue('');
              }}
              size="large"
              type={type === 'office' ? 'primary' : undefined}>
              Office
            </Button>
          </Flex>

          {type && (
            <DocumentsWrapper>
              <DocumentsHeader>
                <h2>
                  {!userId && (
                    <>
                      {type === 'student'
                        ? 'Student List'
                        : type === 'teacher'
                        ? 'Teacher List'
                        : 'Office Documents'}
                    </>
                  )}
                </h2>
              </DocumentsHeader>

              {type == 'office' && !q && (
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

              {type !== 'office' && (
                <>
                  {userId && (
                    <Breadcrumb
                      style={{ fontSize: '1.2em' }}
                      items={[
                        {
                          title: <a>{capitalizeString(type)} List</a>,
                          onClick: () => {
                            searchParams.delete('user_id');
                            searchParams.delete('q');
                            searchParams.set('type', type || 'office');

                            setSearchParams(searchParams);
                          },
                        },
                        {
                          title: (
                            <>
                              {getUserInfo(userId, type)?.first_name}{' '}
                              {getUserInfo(userId, type)?.last_name} Document's
                            </>
                          ),
                        },
                      ]}
                    />
                  )}
                  {!userId && (
                    <FilterWrapper>
                      <Input
                        value={searchValue}
                        placeholder={`Search ${type}...`}
                        size="large"
                        onChange={(e) => {
                          const { value } = e.target;
                          handleSearch(value);
                          setSearchValue(value);
                        }}
                      />
                    </FilterWrapper>
                  )}

                  <div style={{ marginTop: '1em' }}>
                    {type === 'student' && !userId && (
                      <List
                        dataSource={students}
                        loading={isFetchingStudents}
                        renderItem={(student) => (
                          <List.Item>
                            <a
                              onClick={() => {
                                searchParams.delete('search');
                                searchParams.set('type', 'student');
                                searchParams.set('user_id', student.id);
                                setSearchParams(searchParams);
                              }}>
                              {student.first_name} {student.last_name}
                            </a>
                          </List.Item>
                        )}
                      />
                    )}

                    {type === 'teacher' && !userId && (
                      <List
                        dataSource={teachers}
                        loading={isFetchingTeachers}
                        renderItem={(teacher) => (
                          <List.Item>
                            <a
                              onClick={() => {
                                searchParams.delete('search');
                                searchParams.set('type', 'teacher');
                                searchParams.set('user_id', teacher.id);
                                setSearchParams(searchParams);
                              }}>
                              {teacher.first_name} {teacher.last_name}
                            </a>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>

                  {userId && !q && (
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
                              {capitalizeStringWithSpace(
                                item.replace(/_/g, ' '),
                              )}
                            </span>
                          </Button>
                        </List.Item>
                      )}
                    />
                  )}
                </>
              )}
            </DocumentsWrapper>
          )}
        </>
      )}

      {accessType !== AccessType.Admin && (!q || (q && !isFolder)) && (
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

      {q && isFolder && (
        <DocumentsWrapper>
          <DocumentsHeader>
            <Breadcrumb
              style={{ fontSize: '1.2em' }}
              items={[
                {
                  title: <a>Back</a>,
                  onClick: () => {
                    if (accessType === AccessType.Admin) {
                      searchParams.delete('q');
                      searchParams.set('type', type || 'office');
                    } else {
                      searchParams.set('q', '');
                    }

                    setSearchParams(searchParams);
                  },
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
