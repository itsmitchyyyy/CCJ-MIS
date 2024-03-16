import * as yup from 'yup';

export const validationSchema = yup
  .object({
    user_id: yup.string().required('Assigned Teacher is required'),
    description: yup.string(),
    code: yup
      .string()
      .required('Subject Code is required')
      .matches(
        /^\w{3}-?\d{2,}$/,
        'Must be in the format XX-## (e.g. PHI-10/CCJ-12345)',
      )
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
      .min(3, 'Units must be at least 3'),
    time_start: yup.date().required('Start Time is required'),
    time_end: yup
      .date()
      .required('End Time is required')
      .min(yup.ref('time_start'), 'Must be after Start Time')
      .test('Interval', 'Must be at least 1 hour', function (value) {
        if (value && this.parent.time_start) {
          const start = new Date(this.parent.time_start);
          const end = new Date(value);
          const interval = end.getTime() - start.getTime();
          return interval >= 3600000;
        }

        return false;
      }),
    room: yup.string().required('Room is required'),
    days: yup.array().min(1, 'Days is required').required('Days is required'),
  })
  .required();
