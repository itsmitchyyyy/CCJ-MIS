import { GradeEnum } from '@/core/domain/dto/subject.dto';
import * as yup from 'yup';

export const validationSchema = yup
  .object({
    user_id: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required('Student is required'),
          label: yup.string(),
        }),
      )
      .min(1, 'Select atleast one student')
      .required('Student is required'),
  })
  .required();

export const gradeValidationSchema = yup.object({
  period: yup.mixed<GradeEnum>().oneOf(Object.values(GradeEnum)).required(),
  grade: yup.string().required('Grade is required'),
});
