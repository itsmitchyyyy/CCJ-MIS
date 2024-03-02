import * as yup from 'yup';

export const validationSchema = yup
  .object({
    first_name: yup.string().required(''),
    last_name: yup.string().required(''),
    contact_number: yup.string().required(''),
    email: yup.string().email().required(''),
  })
  .required();
