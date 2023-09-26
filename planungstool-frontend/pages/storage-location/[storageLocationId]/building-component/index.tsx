import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../lib/serverSideTranslations';
import { BuildingComponentListContainer } from '../../../../modules/building-component/components/list/BuildingComponentListContainer';
import { useQueryParams } from '../../../../lib/useQueryParams';

export default function StorageLocationBuildingComponentList() {
  const { storageLocationId } = useQueryParams(['storageLocationId']);
  return storageLocationId ? (
    <BuildingComponentListContainer storageLocationId={storageLocationId} />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
