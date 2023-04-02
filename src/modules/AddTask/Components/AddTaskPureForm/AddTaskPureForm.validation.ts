import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('title is required')
    .min(1, 'title must be at least 1 characters')
    .max(20, 'title must not exceed 20 characters'),
  info: Yup.string()
    .required('info is required')
    .min(1, 'info must be at least 1 characters')
    .max(40, 'info must not exceed 40 characters'),
  important: Yup.bool(),
});
