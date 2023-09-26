import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { useQueryParams } from '../../lib/useQueryParams';
import { SearchRequestInterestTableContainer } from '../../modules/search-request-interest/components/list/SearchRequestInterestTableContainer';

export default function SearchRequestInterestsList() {
  const { buildingComponentId, materialsDepotId, searchRequestId } =
    useQueryParams([
      'buildingComponentId',
      'materialsDepotId',
      'searchRequestId',
    ]);
  return (
    <SearchRequestInterestTableContainer
      buildingComponentId={buildingComponentId}
      materialsDepotId={materialsDepotId}
      searchRequestId={searchRequestId}
    />
  );
}

export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
