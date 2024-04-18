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
}

export enum FacilityStatus {
  Booked = 'booked',
  Available = 'available',
}

export enum RequestFacilityStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export type RequestFacility = {
  facility_id: string;
  user_id: string;
  reservation_date: Date;
  reason?: string;
};

export type BorrowRequestFacility = {
  facility_id: string;
  user_id: string;
  borrowed_date: Date;
  reason?: string;
};
