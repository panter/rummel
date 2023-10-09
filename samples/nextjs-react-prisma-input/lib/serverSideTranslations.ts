import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const enum LOCALE {
  DE = 'de',
}
export const commonServerSideTranslations = async (locale = LOCALE.DE) =>
  await serverSideTranslations(locale, ['common']);
