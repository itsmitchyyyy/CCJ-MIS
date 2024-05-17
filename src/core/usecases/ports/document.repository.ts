import {
  AddNewFolderParams,
  AddRequestToDocumentDTO,
  FetchDocumentRequestsQueryParams,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsQuery,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';

export default interface DocumentRepositoryInterface {
  uploadDocument(data: UploadDocumentRequestDTO): Promise<void>;
  fetchDocuments(
    query?: FetchDocumentsQuery,
  ): Promise<FetchDocumentsResponseDTO[]>;
  updateDocument(id: string, data: UpdateDocumentRequestDTO): Promise<void>;
  deleeteDocument(id: string): Promise<void>;
  addRequestToDocument(data: AddRequestToDocumentDTO): Promise<void>;
  fetchDocumentRequests(
    query?: FetchDocumentRequestsQueryParams,
  ): Promise<FetchDocumentRequestsResponseDTO[]>;
  updateDocumentRequest(
    id: string,
    data: UpdateDocumentRequestDTO,
  ): Promise<void>;
  fetchStoredDocuments(userId?: string): Promise<string[]>;
  addNewFolder(data: AddNewFolderParams): Promise<void>;
}
