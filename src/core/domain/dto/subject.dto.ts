import { Subject } from '@/features/management/types';
import { User } from '../entities/user.entity';

export type AddSubjectRequest = {
  user_id: string;
  description?: string;
  code: string;
  name: string;
  units: number;
  time_start: Date;
  time_end: Date;
  room: string;
  days: string;
};

export type FetchSubjectResponseDTO = {
  id: string;
  user: User;
  description?: string;
  code: string;
  name: string;
  units: number;
  time_start: string;
  time_end: string;
  created_at: Date;
  updated_at: Date;
  room: string;
  days: string;
};

export type Grade = {
  first_quarter: string;
  second_quarter: string;
  third_quarter: string;
  fourth_quarter: string;
};

export type FetchStudentSubjectResponseDTO = {
  id: string;
  subject_id: string;
  subject: Subject;
  student_id: string;
  student: User;
  grade: Grade;
};

export type FetchSubjectQuery = {
  teacher_id?: string;
};
