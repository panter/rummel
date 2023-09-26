import { useRouter } from 'next/router';
import {
  LOCALE,
  commonServerSideTranslations,
} from '../../../../lib/serverSideTranslations';
import { BuildingComponentCreateContainer } from '../../../../modules/building-component/components/form/BuildingComponentCreateContainer';
import { isArray } from 'lodash';

export default function BuildingComponentPage() {
  const router = useRouter();
  const queryId = router.query.materialsDepotId;
  const id = isArray(queryId) ? queryId[0] : queryId;
  return id ? <BuildingComponentCreateContainer materialsDepotId={id} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
