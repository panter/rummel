import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { ProjectCreateContainer } from '../../modules/project/components/form/ProjectCreateContainer';

export default function ProjectCreatePage() {
  return <ProjectCreateContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
