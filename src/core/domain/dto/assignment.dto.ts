import { StudentAssignments, Subject } from '@/features/management/types';
import { UploadFile } from 'antd';

export type AssignmentRequestDTO = {
  title: string;
  description: string;
  due_date: Date;
  due_time: Date;
  subject_id: string;
};

export type FetchAssignmentRequestDTO = {
  subject_id?: string;
  student_id?: string;
};

export type FetchAssignmentResponseDTO = Omit<
  AssignmentRequestDTO,
  'due_time'
> & {
  id: string;
  subject: Subject;
  due_time: string;
  student_assignments?: StudentAssignments[];
  created_at?: Date;
  updated_at?: Date;
};

export type StudentAssignmentRequestDTO = {
  user_id: string;
  assignment_id: string;
  comments?: string;
  file_paths: UploadFile[];
};

export type FetchStudentAssignmentsQueryDTO = {
  user_id?: string;
  assignment_id?: string;
  load_relations?: boolean;
};

export type UpdateStudentAssignmentRequestDTO = {
  score: number;
  remarks?: string;
};
