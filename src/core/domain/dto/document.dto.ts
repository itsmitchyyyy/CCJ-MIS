import { DocumentType } from '@/features/documents/types';
import { UploadFile } from 'antd';

export type UploadDocumentRequestDTO = {
  type: DocumentType;
  documents: UploadFile[];
  user_id: string;
};
