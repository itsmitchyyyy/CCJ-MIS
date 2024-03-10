import * as yup from 'yup';

export const validationSchema = yup
  .object({
    current_password: yup
      .string()
      .required('Current Password is required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    new_password: yup
      .string()
      .required('New Password is required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    new_password_confirmation: yup
      .string()
      .required('New Password Confirmation is required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number')
      .oneOf(
        [yup.ref('current_password'), ''],
        'New Password and New Password Confirmation must match',
      ),
  })
  .required();
