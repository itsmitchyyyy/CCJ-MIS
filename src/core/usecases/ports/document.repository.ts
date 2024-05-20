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
import { AccessType } from '@/features/account/types';

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
  fetchStoredDocuments(
    userId?: string,
    accessType?: AccessType,
  ): Promise<string[]>;
  addNewFolder(data: AddNewFolderParams): Promise<void>;
}
