import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { MaterialsDepotListContainer } from '../../modules/materials-depot/components/list/MaterialsDepotListContainer';

export default function MaterialsDepotList() {
  return <MaterialsDepotListContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
