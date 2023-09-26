import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { useQueryParams } from '../../lib/useQueryParams';
import { StorageLocationUpdateContainer } from '../../modules/storage-location/components/form/StorageLocationUpdateContainer';

export default function StorageLocationUpdatePage() {
  const { storageLocationId } = useQueryParams(['storageLocationId']);
  return storageLocationId ? (
    <StorageLocationUpdateContainer storageLocationId={storageLocationId} />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
