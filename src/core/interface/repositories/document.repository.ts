import urls from '@/constants/urls';
import {
  FetchDocumentsResponseDTO,
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
    formData.append('type', data.type);
    data.documents.forEach((document) => {
      formData.append('documents[]', document as unknown as Blob);
    });
    formData.append('user_id', data.user_id);

    return await this.httpAdapter.post(urls.documents.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  fetchDocuments = async (): Promise<FetchDocumentsResponseDTO[]> => {
    return await this.httpAdapter.get(urls.documents.base, {});
  };
}
