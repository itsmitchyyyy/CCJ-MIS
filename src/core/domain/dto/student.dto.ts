import { Subject } from '@/features/management/types';
import { User, UserStatus } from '../entities/user.entity';
import { Grade } from './subject.dto';

export type FetchStudentsResponseDTO = User;

export type FetchStudentsQueryParams = {
  status?: UserStatus;
  search?: string;
};

export type SubjectResource = Omit<Subject, 'time_start' | 'time_end'> & {
  user: User;
  id: string;
  created_at: Date;
  updated_at: Date;
  time_start: string;
  time_end: string;
};

export type FetchStudentSubjectsResponseDTO = {
  id: string;
  subject_id: string;
  subject: SubjectResource;
  student_id: string;
  student: User;
  grade: Grade;
  created_at?: Date;
  updated_at?: Date;
};
