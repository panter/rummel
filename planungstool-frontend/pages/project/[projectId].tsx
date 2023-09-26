import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { ProjectUpdateContainer } from '../../modules/project/components/form/ProjectUpdateContainer';
import { useQueryParams } from '../../lib/useQueryParams';

export default function ProjectUpdatePage() {
  const { projectId } = useQueryParams(['projectId']);
  return projectId ? <ProjectUpdateContainer projectId={projectId} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
