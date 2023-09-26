import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { CategoryTable } from '../../../modules/category/components/CategoryTable';
import React from 'react';

export default function CategoriesAdmin() {
  return <CategoryTable />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
