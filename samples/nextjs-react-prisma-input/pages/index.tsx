import {
  LOCALE,
  commonServerSideTranslations,
} from '../lib/serverSideTranslations';
import {
  gotoListOfAutocompletes,
  gotoListOfBuildingComponents,
  gotoListOfMaterialsDepot,
  gotoListOfProjects,
  gotoListOfSearchRequestInterests,
  gotoListOfSearchRequests,
  gotoListOfStorageLocation,
  gotoMatching,
} from '../lib/locations';

import Link from 'next/link';
import { List } from 'antd';

const linksData = [
  {
    title: <Link {...gotoMatching()}>Matching</Link>,
  },
  {
    title: <Link {...gotoListOfMaterialsDepot()}>Materials Depots</Link>,
  },
  {
    title: <Link {...gotoListOfStorageLocation()}>Storage locations</Link>,
  },
  {
    title: <Link {...gotoListOfProjects()}>Projects</Link>,
  },
  {
    title: <Link {...gotoListOfAutocompletes()}>Autocompletes</Link>,
  },
  {
    title: <Link {...gotoListOfBuildingComponents()}>Building components</Link>,
  },
  {
    title: <Link {...gotoListOfSearchRequests()}>Search requests</Link>,
  },
  {
    title: (
      <Link {...gotoListOfSearchRequestInterests()}>
        Search Requests Interests
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
