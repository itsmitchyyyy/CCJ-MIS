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
