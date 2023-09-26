import {
  LOCALE,
  commonServerSideTranslations,
} from '../../lib/serverSideTranslations';

import { SearchRequestInterestCreateContainer } from '../../modules/search-request-interest/components/form/SearchRequestInterestCreateContainer';
import { useQueryParams } from '../../lib/useQueryParams';

export default function SearchRequestInterestCreatePage() {
  const { searchRequestId, buildingComponentId } = useQueryParams([
    'searchRequestId',
    'buildingComponentId',
  ]);

  return (
    <SearchRequestInterestCreateContainer
      defaultValues={{ searchRequestId, buildingComponentId }}
    />
  );
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
