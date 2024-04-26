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

export type FetchSubjectStudentQueryParams = {
  search?: string;
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
  prelim: string;
  midterm: string;
  semifinal: string;
  final: string;
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

export enum GradeEnum {
  PRELIM = 'prelim',
  MIDTERM = 'midterm',
  SEMIFINAL = 'semifinal',
  FINAL = 'final',
}

export type UpdateGradeRequest = {
  subjectId: string;
  studentId: string;
  grade: { term: GradeEnum; value: string }[];
};
