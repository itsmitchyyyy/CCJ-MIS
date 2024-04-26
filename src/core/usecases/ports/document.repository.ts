import {
  AddRequestToDocumentDTO,
  FetchDocumentRequestsQueryParams,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';

export default interface DocumentRepositoryInterface {
  uploadDocument(data: UploadDocumentRequestDTO): Promise<void>;
  fetchDocuments(): Promise<FetchDocumentsResponseDTO[]>;
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
}
