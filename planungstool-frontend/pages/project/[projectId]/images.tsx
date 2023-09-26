import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { useQueryParams } from '../../../lib/useQueryParams';
import { ProjectImagesContainer } from '../../../modules/project/components/ProjectImagesContainer';

export default function ProjectGalleryPage() {
  const { projectId } = useQueryParams(['projectId']);
  return projectId ? <ProjectImagesContainer projectId={projectId} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
