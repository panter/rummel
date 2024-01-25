import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { AutocompleteTablePrismaModal } from '../../../modules/autocomplete/components/AutocompleteTablePrismaModal';

export default function AutocompleteAdmin() {
  return <AutocompleteTablePrismaModal />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
