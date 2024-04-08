import urls from '@/constants/urls';
import {
  AddRequestToDocumentDTO,
  FetchDocumentRequestsQueryParams,
  FetchDocumentRequestsResponseDTO,
  FetchDocumentsResponseDTO,
  UpdateDocumentRequestDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import DocumentRepositoryInterface from '@/core/usecases/ports/document.repository';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';

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

    return await this.httpAdapter.post(urls.documents.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  fetchDocuments = async (): Promise<FetchDocumentsResponseDTO[]> => {
    return await this.httpAdapter.get(urls.documents.base, {});
  };

  updateDocument = async (
    id: string,
    data: UpdateDocumentRequestDTO,
  ): Promise<void> => {
    return await this.httpAdapter.put(`${urls.documents.base}/${id}`, data, {});
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
}
