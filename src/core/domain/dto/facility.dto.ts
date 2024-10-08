import {
  EquipmentStatus,
  FacilityStatus,
  FacilityType,
  RequestFacilityStatus,
} from '@/features/facilities/types';
import { User } from '../entities/user.entity';
import { UploadFile } from 'antd';

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
  reservation_time?: Date;
  reservation_end_time?: Date;
  user_id: string;
  approved_by?: string;
  approved_date?: Date;
  status?: RequestFacilityStatus;
  reason?: string;
  borrowed_date?: Date;
  borrow_end_date?: Date;
  quantity?: number;
  attachment: UploadFile;
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
  reservation_time?: string;
  reservation_end_time?: string;
  approved_date?: string;
  borrowed_date?: string;
  returned_date?: string;
  rejected_reason?: string;
  status: RequestFacilityStatus;
  equipmentStatus?: EquipmentStatus;
  quantity?: number;
  borrow_end_date?: string;
  reason?: string;
  created_at?: Date;
  updated_at?: Date;
  attachment: string;
};

export type FetchFacilityRequestQuery = {
  facility_id?: string;
  user_id?: string;
  status?: RequestFacilityStatus;
  reservation_date?: Date;
  borrowed_date?: Date;
  returned_date?: Date;
  type?: FacilityType;
  isDamage?: boolean;
  isReturned?: boolean;
};

export type UpdateFacilityRequestDTO = {
  status: RequestFacilityStatus;
  returned_date?: Date;
  rejected_reason?: string;
};
