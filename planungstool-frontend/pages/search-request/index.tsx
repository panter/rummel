import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';

import { SearchRequestsTableContainer } from '../../modules/search-request/components/list/SearchRequestsTableContainer';

export default function SearchRequestList() {
  return <SearchRequestsTableContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
