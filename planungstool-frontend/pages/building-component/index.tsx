import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';

import { BuildingComponentListContainer } from '../../modules/building-component/components/list/BuildingComponentListContainer';

export default function BuildingComponentList() {
  return <BuildingComponentListContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
