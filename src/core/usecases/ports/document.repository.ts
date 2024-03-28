import {
  FetchDocumentsResponseDTO,
  UploadDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';

export default interface DocumentRepositoryInterface {
  uploadDocument(data: UploadDocumentRequestDTO): Promise<void>;
  fetchDocuments(): Promise<FetchDocumentsResponseDTO[]>;
}
