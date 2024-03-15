import { User } from '../entities/user.entity';

export type AddSubjectRequest = {
  user_id: string;
  description?: string;
  code: string;
  name: string;
  units: number;
  time_start: Date;
  time_end: Date;
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
};
