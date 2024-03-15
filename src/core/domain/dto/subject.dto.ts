export type AddSubjectRequest = {
  user_id: string;
  description?: string;
  code: string;
  name: string;
  units: number;
  time_start: Date;
  time_end: Date;
};
