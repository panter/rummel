import { SearchRequestInterestUpdateContainer } from '../../../modules/search-request-interest/components/form/SearchRequestInterestUpdateContainer';
import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { useQueryParams } from '../../../lib/useQueryParams';

export default function SearchRequestInterestUpdatePage() {
  const { searchRequestInterestId } = useQueryParams([
    'searchRequestInterestId',
  ]);
  return searchRequestInterestId ? (
    <SearchRequestInterestUpdateContainer
      searchRequestInterestId={searchRequestInterestId}
    />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
