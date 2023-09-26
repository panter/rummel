import { SearchRequestInterestTableContainer } from '../../../../../../modules/search-request-interest/components/list/SearchRequestInterestTableContainer';
import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../../../lib/serverSideTranslations';
import { useQueryParams } from '../../../../../../lib/useQueryParams';

export default function SearchRequestInterestsList() {
  const { projectId, searchRequestId } = useQueryParams([
    'projectId',
    'searchRequestId',
  ]);

  return (
    <SearchRequestInterestTableContainer
      searchRequestId={searchRequestId}
      projectId={projectId}
    />
  );
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
