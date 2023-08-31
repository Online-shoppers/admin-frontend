import 'react-i18next';

import auth from './locales/en/auth.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
  }
}
