export type Setting = {
  id: string;
  mission?: string;
  vision?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type SettingRequest = {
  mission: string;
  vision: string;
};
