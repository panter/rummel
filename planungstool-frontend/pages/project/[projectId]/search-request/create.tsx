import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../../lib/serverSideTranslations';
import { SearchRequestCreateContainer } from '../../../../modules/search-request/components/form/SearchRequestCreateContainer';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';

export default function SearchRequestCreatePage() {
  const router = useRouter();
  const projectId = router.query.projectId;
  const id = isArray(projectId) ? projectId[0] : projectId;
  return id ? <SearchRequestCreateContainer projectId={id} /> : null;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
