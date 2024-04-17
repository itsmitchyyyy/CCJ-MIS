import * as yup from 'yup';
import { FacilityType } from '../types';

export const validationSchema = yup
  .object({
    type: yup
      .mixed<FacilityType>()
      .oneOf(Object.values(FacilityType))
      .required('Type is required'),
    name: yup.string().required('Name is required'),
    description: yup.string(),
  })
  .required();
