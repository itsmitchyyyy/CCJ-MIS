import {
  DocumentRequestStatus,
  DocumentStatus,
  DocumentType,
} from '@/features/documents/types';
import { UploadFile } from 'antd';
import { User } from '../entities/user.entity';

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
  rejected_reason?: string;
};

export type AddRequestToDocumentDTO = {
  user_id: string;
  document_id: string;
  reason?: string;
  status?: DocumentRequestStatus;
};

export type FetchDocumentRequestsResponseDTO = {
  id: string;
  user_id: string;
  user: User;
  document_id: string;
  document: FetchDocumentsResponseDTO;
  status: DocumentRequestStatus;
  reason?: string;
  rejected_reason?: string;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
};

export type FetchDocumentRequestsQueryParams = {
  status?: DocumentRequestStatus;
  user_id?: string;
};
