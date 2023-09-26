import {
  LOCALE,
  commonServerSideTranslations,
} from '../../lib/serverSideTranslations';
import { MaterialsDepotCreateContainer } from '../../modules/materials-depot/components/form/MaterialsDepotCreateContainer';

export default function MaterialsDepotCreatePage() {
  return <MaterialsDepotCreateContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
