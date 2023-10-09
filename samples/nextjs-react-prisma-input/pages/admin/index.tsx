import {
  LOCALE,
  commonServerSideTranslations,
} from '../../lib/serverSideTranslations';

export default function Admin() {
  return <div>Wo isch de admin, hä!! ....HÄ!!</div>;
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
