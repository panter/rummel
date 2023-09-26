import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { MaterialsDepotImagesContainer } from '../../../modules/materials-depot/components/MaterialsDepotImagesContainer';

export default function MaterialsDepotGalleryPage() {
  const router = useRouter();
  const queryId = router.query.materialsDepotId;
  const id = isArray(queryId) ? queryId[0] : queryId;
  return id ? <MaterialsDepotImagesContainer materialsDepotId={id} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
