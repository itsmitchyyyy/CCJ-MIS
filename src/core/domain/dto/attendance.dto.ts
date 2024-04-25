import { Subject } from '@/features/management/types';
import { User } from '../entities/user.entity';

export enum AttendanceStatus {
  EXCUSE = 'excuse',
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

export type CreateAttendanceRequestDTO = {
  user_id: string;
  subject_id: string;
  date: Date;
  status: AttendanceStatus;
};

export type CreateAttendanceResponseDTO = {
  user_id: string;
  user: User;
  subject_id: string;
  subject: Subject;
  date: Date;
  status: AttendanceStatus;
};

export type FetchAttendanceBySubjectIdAndStudentIdRequestDTO = {
  subject_id?: string;
  student_id?: string;
  date?: string;
  status?: AttendanceStatus;
};

export type FetchAttendanceBySubjectIdAndStudentIdResponseDTO = {
  user_id: string;
  user: User;
  subject_id: string;
  subject: Subject;
  date: Date;
  status: AttendanceStatus;
};

export type CreateTeacherAttendanceRequestDTO = {
  user_id: string;
  date: Date;
  status: AttendanceStatus;
};

export type FetchTeacherAttendanceQueryParams = {
  user_id?: string;
  date?: string;
  status?: AttendanceStatus;
};

export type FetchTeacherAttendanceResponseDTO = {
  user_id: string;
  user: User;
  date: Date;
  status: AttendanceStatus;
  created_at?: Date;
  updated_at?: Date;
};
