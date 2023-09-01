import * as yup from 'yup';

export const updateBeerSchema = yup.object().shape({
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
  abv: yup
    .number()
    .typeError('product:validations.ABV-is-required')
    .required('product:validations.ABV-is-required'),
  country: yup.string().trim().required('product:validations.Country-is-required'),
  volume: yup
    .number()
    .typeError('product:validations.Volume-is-required')
    .required('product:validations.Volume-is-required'),
  ibu: yup
    .number()
    .typeError('product:validations.IBU-is-required')
    .required('product:validations.IBU-is-required'),
  archived: yup.boolean().required(),
});
