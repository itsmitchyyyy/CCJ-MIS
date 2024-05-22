import { UploadFile } from 'antd';

export type Tab = {
  label: string;
  key: string;
  children: React.ReactNode;
};

export enum FacilityType {
  Regular = 'regular',
  AVR = 'avr',
  LAB = 'laboratories',
  Equipment = 'equipment',
  MyRequest = 'my-request',
}

export enum FacilityStatus {
  Booked = 'booked',
  Available = 'available',
  Unavailable = 'unavailable',
}

export enum RequestFacilityStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
  Cancelled = 'cancelled',
}

export type RequestFacility = {
  facility_id: string;
  user_id: string;
  reservation_date: Date;
  reservation_time: Date;
  reservation_end_time: Date;
  reason?: string;
  attachment: UploadFile;
};

export type BorrowRequestFacility = {
  facility_id: string;
  user_id: string;
  borrowed_date: Date;
  reason?: string;
  borrow_end_date: Date;
  quantity: number;
  attachment: UploadFile;
};

export enum EquipmentStatus {
  Lost = 'lost',
  Perfect = 'perfect',
  SlightlyDamaged = 'slightly damaged',
  Damaged = 'damage',
  BadlyDamaged = 'badly damage',
}
