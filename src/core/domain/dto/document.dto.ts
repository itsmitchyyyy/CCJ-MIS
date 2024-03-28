import { DocumentType } from '@/features/documents/types';
import { UploadFile } from 'antd';

export type UploadDocumentRequestDTO = {
  type: DocumentType;
  documents: UploadFile[];
  user_id: string;
};

export type FetchDocumentsResponseDTO = {
  id: string;
  type: DocumentType;
  file_path: string;
  user_id: string;
  name: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
};
