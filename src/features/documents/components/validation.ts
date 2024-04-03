import * as yup from 'yup';

export const validationSchema = yup
  .object({
    is_private: yup.boolean().required(),
  })
  .required();
