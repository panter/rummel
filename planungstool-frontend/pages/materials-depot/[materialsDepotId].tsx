import { useRouter } from 'next/router';
import {
  LOCALE,
  commonServerSideTranslations,
} from '../../lib/serverSideTranslations';
import { MaterialsDepotUpdateContainer } from '../../modules/materials-depot/components/form/MaterialsDepotUpdateContainer';
import { isArray, isString } from 'lodash';

export default function MaterialsDepotUpdatePage() {
  const router = useRouter();
  const queryId = router.query.materialsDepotId;
  const id = isArray(queryId) ? queryId[0] : queryId;
  return id ? <MaterialsDepotUpdateContainer materialsDepotId={id} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
