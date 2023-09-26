import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../../lib/serverSideTranslations';
import { useQueryParams } from '../../../../../lib/useQueryParams';
import { BuildingComponentImagesContainer } from '../../../../../modules/building-component/components/BuildingComponentImagesContainer';

export default function BuildingComponentsGalleryPage() {
  const { buildingComponentId } = useQueryParams(['buildingComponentId']);
  return buildingComponentId ? (
    <BuildingComponentImagesContainer
      buildingComponentId={buildingComponentId}
    />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
