import { FacilityStatus, FacilityType } from '@/features/facilities/types';

export type StoreFacilityDTO = {
  type: FacilityType;
  name: string;
  description?: string;
  room_number?: string;
};

export type FacilityDTO = {
  id: string;
  type: FacilityType;
  name: string;
  description?: string;
  status: FacilityStatus;
  created_at?: Date;
  updated_at?: Date;
};
