import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { StorageLocationCreateContainer } from '../../modules/storage-location/components/form/StorageLocationCreateContainer';

export default function StorageLocationCreatePage() {
  return <StorageLocationCreateContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
