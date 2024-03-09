import * as yup from 'yup';

export const roleList = ['Student', 'Admin', 'Teacher'];

export const validationSchema = yup
  .object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    contact_number: yup.string().required('Contact number is required'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    role: yup
      .string()
      .required('Role is required')
      .oneOf(roleList.map((role) => role.toLocaleLowerCase()))
      .label('Selected Role'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    username: yup.string().required('Username is required'),
  })
  .required();
