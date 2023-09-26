import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import React from 'react';
import { EbkphCategoryTable } from '../../../modules/ebkphCategory/components/EbkphCategoryTable';

export default function EbkphCategoriesAdmin() {
  return <EbkphCategoryTable />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
