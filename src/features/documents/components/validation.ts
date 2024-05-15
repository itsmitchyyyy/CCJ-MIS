import * as yup from 'yup';

export const validationSchema = yup
  .object({
    type: yup.string().oneOf(['office', 'document']).required(),
    is_private: yup.boolean().when('type', {
      is: (value: string) => value === 'document',
      then: () => yup.boolean().required(),
    }),
  })
  .required();

export const rejectedValidationSchema = yup.object({
  rejected_reason: yup.string().required('Reason is required'),
});
