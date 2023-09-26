import {
  LOCALE,
  commonServerSideTranslations,
} from '../../../lib/serverSideTranslations';

import { BuildingComponentUpdateContainer } from '../../../modules/building-component/components/form/BuildingComponentUpdateContainer';
import { isArray } from 'lodash';
import { useRouter } from 'next/router';

export default function BuildingComponentUpdatePage() {
  const router = useRouter();
  const queryId = router.query.buildingComponentId;
  const id = isArray(queryId) ? queryId[0] : queryId;
  return id ? (
    <BuildingComponentUpdateContainer buildingComponentId={id} />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
