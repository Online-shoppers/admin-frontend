import 'react-i18next';

import auth from './locales/en/auth';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
  }
}
