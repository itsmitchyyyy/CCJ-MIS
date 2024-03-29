import * as yup from 'yup';

export const validationSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    due_date: yup.date().required('Due date is required'),
    description: yup.string().required('Description is required'),
  })
  .required();