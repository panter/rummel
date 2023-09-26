import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { StorageLocationImagesContainer } from '../../../modules/storage-location/components/StorageLocationImagesContainer';
import { useQueryParams } from '../../../lib/useQueryParams';

export default function StorageLocationGalleryPage() {
  const { storageLocationId } = useQueryParams(['storageLocationId']);
  return storageLocationId ? (
    <StorageLocationImagesContainer storageLocationId={storageLocationId} />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
