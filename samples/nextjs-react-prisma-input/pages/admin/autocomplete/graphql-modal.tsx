import {
  commonServerSideTranslations,
  LOCALE,
} from '../../../lib/serverSideTranslations';
import { AutocompleteTableGraphqlModal } from '../../../modules/autocomplete/components/AutocompleteTableGraphqlModal';

export default function PrisaModalAutocompleteAdmin() {
  return <AutocompleteTableGraphqlModal />;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
