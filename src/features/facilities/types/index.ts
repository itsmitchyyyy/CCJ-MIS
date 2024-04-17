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
