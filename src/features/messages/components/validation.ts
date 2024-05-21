import * as yup from 'yup';

export const messageValidationSchema = yup.object({
  description: yup.string().required('Description is required'),
});
