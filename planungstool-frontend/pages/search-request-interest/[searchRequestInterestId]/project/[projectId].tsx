import {
  LOCALE,
  commonServerSideTranslations,
} from '../../../../lib/serverSideTranslations';

import { ProjectUpdateContainer } from '../../../../modules/project/components/form/ProjectUpdateContainer';
import { useQueryParams } from '../../../../lib/useQueryParams';

export default function ProjectUpdatePage() {
  const { projectId, searchRequestInterestId } = useQueryParams([
    'projectId',
    'searchRequestInterestId',
  ]);
  return projectId ? (
    <ProjectUpdateContainer
      projectId={projectId}
      searchRequestInterestId={searchRequestInterestId}
    />
  ) : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
