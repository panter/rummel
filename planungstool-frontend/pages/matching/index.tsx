import {
  commonServerSideTranslations,
  LOCALE,
} from '../../lib/serverSideTranslations';
import { MatchingContainer } from '../../modules/matching/components/form/MatchingContainer';

export default function Matching() {
  return <MatchingContainer />;
}

export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
