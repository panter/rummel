import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../lib/serverSideTranslations';
import { BuildingComponentUpdateContainer } from '../../../../modules/building-component/components/form/BuildingComponentUpdateContainer';
import { useQueryParams } from '../../../../lib/useQueryParams';

export default function StorageLocationUpdatePage() {
  const { buildingComponentId } = useQueryParams(['buildingComponentId']);
  return buildingComponentId ? (
    <BuildingComponentUpdateContainer
      buildingComponentId={buildingComponentId}
    />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
