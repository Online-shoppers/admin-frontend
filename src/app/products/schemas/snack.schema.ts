import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const SnackSchema = () => {
  const { t } = useTranslation('product');
  return Yup.object().shape({
    name: Yup.string().required(t('Name-required')),
    price: Yup.number().min(1, t('Price-min')).required(t('Price-required')),
    description: Yup.string().required(t('Description-required')),
    quantity: Yup.number().min(1, t('Quantity-min')).required('Quantity-required'),
    weight: Yup.number().min(0.1, t('Weight-min')).required(t('Weight-required')),
    image_url: Yup.string().required(t('ImageUrl-required')),
    archived: Yup.boolean(),
  });
};
