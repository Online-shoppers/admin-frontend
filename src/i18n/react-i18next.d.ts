import 'react-i18next';

import auth from './locales/en/auth.json';
import errors from './locales/en/errors.json';
import products from './locales/en/products.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
    errors: typeof errors;
    products: typeof products;
  }
}
