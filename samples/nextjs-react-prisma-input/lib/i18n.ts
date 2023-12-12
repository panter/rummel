import commonDe from '../public/locales/de/common.json';
import commonEn from '../public/locales/en/common.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  de: {
    common: commonDe,
  },
  en: {
    common: commonEn,
  },
};

export const defaultNS = 'common';

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    ns: [defaultNS],
    defaultNS,
    lng: 'de',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    returnNull: false,
  });

export default i18next;
