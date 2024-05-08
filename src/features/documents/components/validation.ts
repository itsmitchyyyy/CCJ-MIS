import * as yup from 'yup';

export const validationSchema = yup
  .object({
    is_private: yup.boolean().required(),
  })
  .required();

export const rejectedValidationSchema = yup.object({
  rejected_reason: yup.string().required('Reason is required'),
});
