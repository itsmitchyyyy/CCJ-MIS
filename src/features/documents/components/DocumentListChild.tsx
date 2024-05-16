import { useEffect, useState } from 'react';
import {
  DocumentsHeader,
  DocumentsWrapper,
  FileTextWrapper,
  FileWrapper,
  StyledTextArea,
} from './elements';
import { Button, Form, List, Popconfirm } from 'antd';
import {
  AddRequestToDocumentDTO,
  FetchDocumentsResponseDTO,
} from '@/core/domain/dto/document.dto';
import { Modal } from '@/components/Elements/Modal';
import { useGlobalState } from '@/hooks/global';
import { DocumentType } from '../types';
import { AccessType } from '@/features/account/types';
import { Controller, useForm } from 'react-hook-form';
import {
  DeleteOutlined,
  LockOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { BACKEND_URL } from '@/config';

type Props = {
  documents: FetchDocumentsResponseDTO[];
  onDeleteDocument: (id: string) => void;
  isDeletingDocument?: boolean;
  isRequestingDocument?: boolean;
  isRequestingDocumentSuccess?: boolean;
  onAddRequestToDocument: (data: AddRequestToDocumentDTO) => void;
};

const DocumentListChild = ({
  documents,
  onDeleteDocument,
  isDeletingDocument,
  isRequestingDocument,
  isRequestingDocumentSuccess,
  onAddRequestToDocument,
}: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();

  const [mappedDocuments, setMappedDocuments] = useState<
    FetchDocumentsResponseDTO[]
  >([]);
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] =
    useState<FetchDocumentsResponseDTO | null>(null);

  const {
    handleSubmit: onHandleSubmitRequest,
    control: controlRequest,
    reset: resetRequest,
  } = useForm({
    defaultValues: {
      reason: '',
    },
  });

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
    if (isRequestingDocumentSuccess) {
      setSelectedDocument(null);
      setOpenRequestModal(false);
      resetRequest();
    }
  }, [isRequestingDocumentSuccess]);

  return (
    <DocumentsWrapper>
      <DocumentsHeader>
        <h1>Documents</h1>
      </DocumentsHeader>

      <div>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
          dataSource={mappedDocuments}
          renderItem={(item) => (
            <List.Item>
              <FileWrapper>
                {item.is_private && accessType !== AccessType.Admin ? (
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
                        {item.is_private && accessType === AccessType.Admin ? (
                          <LockOutlined />
                        ) : null}
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
    </DocumentsWrapper>
  );
};

export default DocumentListChild;
