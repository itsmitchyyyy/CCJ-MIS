import {
  EquipmentStatus,
  FacilityStatus,
  FacilityType,
  RequestFacilityStatus,
} from '@/features/facilities/types';
import { User } from '../entities/user.entity';

export type StoreFacilityDTO = {
  type: FacilityType;
  name: string;
  description?: string;
  room_number?: string;
};

export type UpdateFacilityQuery = {
  status?: FacilityStatus;
  request_id?: string;
  equipmentStatus?: EquipmentStatus;
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
  user_id?: string;
};

export type FacilityDTO = {
  id: string;
  type: FacilityType;
  name: string;
  description?: string;
  room_number?: string;
  status: FacilityStatus;
  created_at?: Date;
  updated_at?: Date;
};

export type FacilityRequestDTO = {
  id: string;
  facility_id: string;
  facility: FacilityDTO;
  user_id: string;
  user: User;
  approved_by?: string;
  approved_by_user?: User;
  reservation_date?: string;
  approved_date?: string;
  borrowed_date?: string;
  returned_date?: string;
  status: RequestFacilityStatus;
  equipmentStatus?: EquipmentStatus;
  reason?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type FetchFacilityRequestQuery = {
  facility_id?: string;
  user_id?: string;
  status?: RequestFacilityStatus;
  reservation_date?: Date;
  borrowed_date?: Date;
  returned_date?: Date;
};

export type UpdateFacilityRequestDTO = {
  status: RequestFacilityStatus;
  returned_date?: Date;
};
