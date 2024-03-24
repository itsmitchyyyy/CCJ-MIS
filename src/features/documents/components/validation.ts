import * as yup from 'yup';

export const validationSchema = yup
  .object({
    type: yup.string().required('Parent Directory is required'),
  })
  .required();
