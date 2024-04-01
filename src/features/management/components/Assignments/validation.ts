import * as yup from 'yup';

export const validationSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    due_date: yup.date().required('Due date is required'),
    description: yup.string().required('Description is required'),
  })
  .required();

export const studentAssignmentValidationSchema = yup
  .object({
    comments: yup.string(),
  })
  .required();

export const updateScoreValidationSchema = yup.object({
  score: yup.number().required('Score is required'),
  remarks: yup.string(),
});
