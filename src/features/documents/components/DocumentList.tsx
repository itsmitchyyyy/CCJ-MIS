import { Collapse, CollapseProps } from 'antd';
import { DocumentsHeader, DocumentsWrapper } from './elements';
import RequestList from './RequestList';
import {
  AddRequestToDocumentDTO,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import DocumentListChild from './DocumentListChild';

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
}: Props) => {
  const initalDocumentItems: CollapseProps['items'] = [
    {
      key: 'document_list',
      label: <b>Document List</b>,
      children: (
        <DocumentListChild
          isRequestingDocument={isRequestingDocument}
          isRequestingDocumentSuccess={isRequestingDocumentSuccess}
          onAddRequestToDocument={onAddRequestToDocument}
          documents={documents}
          isLoading={isLoading}
          isSuccessful={isSuccessful}
          onUploadDocuments={onUploadDocuments}
          onDeleteDocument={onDeleteDocument}
          isDeletingDocument={isDeletingDocument}
        />
      ),
    },
    {
      key: 'request_list',
      label: <b>Request List</b>,
      children: (
        <RequestList
          isFetchingDocumentRequests={isFetchingDocumentRequests}
          documentRequests={documentRequests}
          isUpdatingDocumentRequest={isUpdatingDocumentRequest}
          isUpdateDocumentRequestSuccess={isUpdateDocumentRequestSuccess}
          onUpdateDocumentRequest={onUpdateDocumentRequest}
        />
      ),
    },
    {
      key: 'stored_documents',
      label: <b>Stored Documents</b>,
    },
  ];

  return (
    <DocumentsWrapper>
      <DocumentsHeader>
        <h1>Documents</h1>
      </DocumentsHeader>

      <div>
        <Collapse ghost items={initalDocumentItems} />
      </div>
    </DocumentsWrapper>
  );
};

export default DocumentList;
