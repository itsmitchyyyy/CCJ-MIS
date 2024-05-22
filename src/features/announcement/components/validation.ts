import * as yup from 'yup';
import { AnnouncementType } from '../types';

export const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  type: yup
    .mixed<AnnouncementType>()
    .oneOf(Object.values(AnnouncementType))
    .required('Type is required'),
});
