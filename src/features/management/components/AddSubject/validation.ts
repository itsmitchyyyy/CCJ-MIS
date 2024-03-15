import * as yup from 'yup';

export const validationSchema = yup
  .object({
    user_id: yup.string().required('Assigned Teacher is required'),
    description: yup.string(),
    code: yup
      .string()
      .required('Subject Code is required')
      .test('Check Prefix', 'Subject Code must start with CCJ', (value) => {
        if (value) {
          return value.startsWith('CCJ');
        }
        return false;
      }),
    name: yup.string().required('Subject Name is required'),
    units: yup
      .number()
      .required('Units is required')
      .min(1, 'Units must be at least 1'),
    time_start: yup.date().required('Start Time is required'),
    time_end: yup
      .date()
      .required('End Time is required')
      .min(yup.ref('time_start'), 'Must be after Start Time'),
  })
  .required();
