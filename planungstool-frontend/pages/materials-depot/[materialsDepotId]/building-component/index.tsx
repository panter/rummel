import { useRouter } from 'next/router';
import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../lib/serverSideTranslations';
import { BuildingComponentListContainer } from '../../../../modules/building-component/components/list/BuildingComponentListContainer';
import { isArray } from 'lodash';

export default function MaterialsDepotList() {
  const router = useRouter();
  const queryId = router.query.materialsDepotId;
  const id = isArray(queryId) ? queryId[0] : queryId;
  return id ? <BuildingComponentListContainer materialsDepotId={id} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
