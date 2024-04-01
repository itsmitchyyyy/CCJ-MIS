import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { User } from '@/core/domain/entities/user.entity';
import { ErrorMessageObject } from '@/features/account/types';

export type useSubjectState = {
  subjectError: ErrorMessageObject;
  setSubjectError: (data: ErrorMessageObject) => void;
  removeSubjectError: () => void;
};

export type Subject = {
  description?: string | undefined;
  user_id: string;
  code: string;
  name: string;
  units: number;
  time_start: Date;
  time_end: Date;
  room: string;
  days: string;
};

export type SubjectRequest = {
  user_id: string;
  description?: string;
  code: string;
  name: string;
  units: number;
  time_start: Date;
  time_end: Date;
  room: string;
  days: string[];
};

export type AddStudentToSubjectRequest = {
  subjectId: string;
  studentId: string[];
};

export type Attendance = {
  user_id: string;
  subject_id: string;
  date: Date;
  status: AttendanceStatus;
};

export type Assignment = {
  id: string;
  title: string;
  due_date: Date;
  description: string;
  subject_id: string;
  subject: Subject;
  created_at?: Date;
  updated_at?: Date;
};

export type AssignmentRequest = Omit<
  Assignment,
  'subject' | 'subject_id' | 'created_at' | 'updated_at' | 'id'
>;

export type StudentAssignment = {
  id: string;
  user_id: string;
  assignment_id: string;
  score: number;
  file_paths: string[];
  comments: string;
  remarks: string;
  created_at?: Date;
  updated_at?: Date;
};

export type StudentAssignments = StudentAssignment & {
  student: User;
  assignment: Assignment;
};

export type UpdateStudentAssignment = {
  score: number;
  remarks?: string;
};
