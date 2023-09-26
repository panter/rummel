import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { AutocompleteTable } from '../../../modules/autocomplete/components/AutocompleteTable';

export default function AutocompleteAdmin() {
  return <AutocompleteTable />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
    layout: 'fluid',
  },
});
