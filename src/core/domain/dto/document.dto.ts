import {
  DocumentRequestStatus,
  DocumentStatus,
  DocumentType,
} from '@/features/documents/types';
import { UploadFile } from 'antd';

export type UploadDocumentRequestDTO = {
  type: DocumentType;
  documents: UploadFile[];
  user_id: string;
  status?: DocumentStatus;
  is_private?: boolean;
};

export type FetchDocumentsResponseDTO = {
  id: string;
  type: DocumentType;
  file_path: string;
  user_id: string;
  name: string;
  status: string;
  is_private: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type UpdateDocumentRequestDTO = {
  status: DocumentStatus;
};

export type AddRequestToDocumentDTO = {
  user_id: string;
  document_id: string;
  reason?: string;
  status?: DocumentRequestStatus;
};
