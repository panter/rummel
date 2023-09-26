import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { StorageLocationListContainer } from '../../modules/storage-location/components/list/StorageLocationListContainer';

export default function StorageLocationList() {
  return <StorageLocationListContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
