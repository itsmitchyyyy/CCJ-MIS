import {
  FacilityStatus,
  FacilityType,
  RequestFacilityStatus,
} from '@/features/facilities/types';

export type StoreFacilityDTO = {
  type: FacilityType;
  name: string;
  description?: string;
  room_number?: string;
};

export type StoreRequestFacilityDTO = {
  reservation_date?: Date;
  user_id: string;
  approved_by?: string;
  approved_date?: Date;
  status?: RequestFacilityStatus;
  reason?: string;
  borrowed_date?: Date;
};

export type FacilityQuery = {
  type?: FacilityType;
  status?: FacilityStatus;
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
