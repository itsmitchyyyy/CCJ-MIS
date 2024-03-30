import { Subject } from '@/features/management/types';
import { UploadFile } from 'antd';

export type AssignmentRequestDTO = {
  title: string;
  description: string;
  due_date: Date;
  subject_id: string;
};

export type FetchAssignmentRequestDTO = {
  subject_id?: string;
};

export type FetchAssignmentResponseDTO = AssignmentRequestDTO & {
  id: string;
  subject: Subject;
  created_at?: Date;
  updated_at?: Date;
};

export type StudentAssignmentRequestDTO = {
  user_id: string;
  assignment_id: string;
  comments?: string;
  file_paths: UploadFile[];
};
