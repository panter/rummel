import {
  gotoAutocompletesGraphqlModal,
  gotoAutocompletesPrismaModal,
} from '../lib/locations';
import {
  LOCALE,
  commonServerSideTranslations,
} from '../lib/serverSideTranslations';

import { List } from 'antd';
import Link from 'next/link';

const linksData = [
  {
    title: (
      <Link {...gotoAutocompletesPrismaModal()}>Autocomplete Prisma Modal</Link>
    ),
  },
  {
    title: (
      <Link {...gotoAutocompletesGraphqlModal()}>
        Autocomplete Graphql Modal
      </Link>
    ),
  },
];

export default function Index() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={linksData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
}
export const getServerSideProps = async ({ locale }: { locale: LOCALE }) => ({
  props: {
    ...(await commonServerSideTranslations(locale)),
  },
});
