import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import authEn from './locales/eng/auth.json';
import authRu from './locales/ru/auth.json';

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
      en: {
        auth: authEn,
      },
      ru: {
        auth: authRu,
      },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
