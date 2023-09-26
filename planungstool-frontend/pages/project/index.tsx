import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { ProjectsTableContainer } from '../../modules/project/components/list/ProjectsTableContainer';

export default function ProjectList() {
  return <ProjectsTableContainer />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
