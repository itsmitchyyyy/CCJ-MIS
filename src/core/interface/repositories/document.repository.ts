import urls from '@/constants/urls';
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
import DocumentRepositoryInterface from '@/core/usecases/ports/document.repository';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import { AccessType } from '@/features/account/types';

export default class DocumentRepository implements DocumentRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  uploadDocument = async (data: UploadDocumentRequestDTO): Promise<void> => {
    const formData = new FormData();

    if (data.status) {
      formData.append('status', data.status);
    }

    formData.append('type', data.type);
    data.documents.forEach((document) => {
      formData.append('documents[]', document as unknown as Blob);
    });
    formData.append('user_id', data.user_id);

    if (data.is_private) {
      formData.append('is_private', JSON.stringify(+data.is_private));
    }

    if (data.folder_type) {
      formData.append('folder_type', data.folder_type);
    }

    return await this.httpAdapter.post(urls.documents.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  fetchDocuments = async (
    query?: FetchDocumentsQuery,
  ): Promise<FetchDocumentsResponseDTO[]> => {
    return await this.httpAdapter.get(urls.documents.base, {
      params: query,
    });
  };

  updateDocument = async (
    id: string,
    data: UpdateDocumentRequestDTO,
  ): Promise<void> => {
    return await this.httpAdapter.put(`${urls.documents.base}/${id}`, data, {});
  };

  deleeteDocument = async (id: string): Promise<void> => {
    return await this.httpAdapter.delete(`${urls.documents.base}/${id}`, {});
  };

  addRequestToDocument = async (
    data: AddRequestToDocumentDTO,
  ): Promise<void> => {
    return await this.httpAdapter.post(urls.documents.requests, data, {});
  };

  fetchDocumentRequests = async (
    query?: FetchDocumentRequestsQueryParams,
  ): Promise<FetchDocumentRequestsResponseDTO[]> => {
    return await this.httpAdapter.get(urls.documents.requests, {
      params: query,
    });
  };

  updateDocumentRequest = async (
    id: string,
    data: UpdateDocumentRequestDTO,
  ): Promise<void> => {
    return await this.httpAdapter.put(
      `${urls.documents.requests}/${id}`,
      data,
      {},
    );
  };

  fetchStoredDocuments = async (
    userId?: string,
    accessType?: AccessType,
  ): Promise<string[]> => {
    return await this.httpAdapter.get(urls.documents.storedDocuments, {
      params: { user_id: userId, access_type: accessType },
    });
  };

  addNewFolder = async (data: AddNewFolderParams): Promise<void> => {
    return await this.httpAdapter.post(urls.documents.addNewFolder, data, {});
  };
}
