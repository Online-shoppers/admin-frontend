import * as yup from 'yup';

export const updateAccessorySchema = yup.object().shape({
  name: yup.string().trim().required('product:validations.Name-is-required'),
  price: yup
    .number()
    .typeError('product:validations.Price-is-required')
    .required('product:validations.Price-is-required'),
  description: yup.string().trim().required('product:validations.Description-is-required'),
  image_url: yup
    .string()
    .url('product:validations.URL-must-be-a-link')
    .trim()
    .required('product:validations.URL-is-required'),
  quantity: yup
    .number()
    .typeError('product:validations.Quantity-is-required')
    .required('product:validations.Quantity-is-required'),
  weight: yup
    .number()
    .typeError('product:validations.Weight-is-required')
    .required('product:validations.Weight-is-required'),
  archived: yup.boolean().required('Archived is required'),
});
