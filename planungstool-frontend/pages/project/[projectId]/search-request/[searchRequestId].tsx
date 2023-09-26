import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../lib/serverSideTranslations';
import { SearchRequestUpdateContainer } from '../../../../modules/search-request/components/form/SearchRequestUpdateContainer';
import { useQueryParams } from '../../../../lib/useQueryParams';

export default function SearchRequestUpdatePage() {
  const { searchRequestId, projectId } = useQueryParams([
    'searchRequestId',
    'projectId',
  ]);
  return searchRequestId ? (
    <SearchRequestUpdateContainer
      projectId={projectId}
      searchRequestId={searchRequestId}
    />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
