import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import authEn from './locales/en/auth.json';
import errorsEn from './locales/en/errors.json';
import productEn from './locales/en/products.json';
import validationsEn from './locales/en/validations.json';
import authRu from './locales/ru/auth.json';
import errorsRu from './locales/ru/errors.json';
import productRu from './locales/ru/products.json';
import validationsRu from './locales/ru/validations.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    load: 'all',
    debug: true,
    keySeparator: '.',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { auth: authEn, errors: errorsEn, product: productEn, validations: validationsEn },
      ru: { auth: authRu, errors: errorsRu, product: productRu, validations: validationsRu },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
