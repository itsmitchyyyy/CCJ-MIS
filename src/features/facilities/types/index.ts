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
  reason?: string;
};

export type BorrowRequestFacility = {
  facility_id: string;
  user_id: string;
  borrowed_date: Date;
  reason?: string;
};

export enum EquipmentStatus {
  Lost = 'lost',
  Perfect = 'perfect',
  SlightlyDamaged = 'slightly damaged',
  Damaged = 'damaged',
  BadlyDamaged = 'badly damaged',
}
