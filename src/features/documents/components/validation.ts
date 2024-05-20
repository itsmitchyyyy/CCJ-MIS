import * as yup from 'yup';

export const validationSchema = yup
  .object({
    type: yup.string().oneOf(['office', 'document']).required(),
    is_private: yup.boolean().when('type', {
      is: (value: string) => value === 'document',
      then: () => yup.boolean().required(),
    }),
    folder_type: yup.string().when('type', {
      is: (value: string) => value === 'office',
      then: () => yup.string().required(),
    }),
  })
  .required();

export const rejectedValidationSchema = yup
  .object({
    rejected_reason: yup.string().required('Reason is required'),
  })
  .required();

export const addFolderValidationSchema = yup
  .object({
    folderName: yup.string().required('Folder name is required'),
  })
  .required();

export const uploadValidationSchema = yup
  .object({
    type: yup.string().oneOf(['student', 'teacher']).required(),
  })
  .required();
