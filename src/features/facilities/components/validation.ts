import * as yup from 'yup';
import { EquipmentStatus, FacilityType } from '../types';

export const validationSchema = yup
  .object({
    type: yup
      .mixed<FacilityType>()
      .oneOf(Object.values(FacilityType))
      .required('Type is required'),
    name: yup.string().required('Name is required'),
    description: yup.string(),
    room_number: yup.string().when('type', {
      is: (value: FacilityType) => value !== FacilityType.Equipment,
      then: () => yup.string().required('Room number is required'),
    }), // 👈
  })
  .required();

export const bookingValidationSchema = yup.object({
  reservation_date: yup.date().required('Reservation date is required'),
  reservation_time: yup.date().required('Start Time is required'),
  reason: yup.string(),
});

export const borrowValidationSchema = yup.object({
  borrowed_date: yup.date().required('Reservation date is required'),
  reason: yup.string(),
});

export const equipmentValidationSchema = yup.object({
  equipmentStatus: yup
    .mixed<EquipmentStatus>()
    .oneOf(Object.values(EquipmentStatus))
    .required('Equipment status is required'),
});

export const rejectedValidationSchema = yup.object({
  rejected_reason: yup.string().required('Reason is required'),
});
