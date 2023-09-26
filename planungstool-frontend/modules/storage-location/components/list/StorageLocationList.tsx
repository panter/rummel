import { FragmentType, graphql, useFragment } from '../../../../@generated';
import { gotoStorageLocation } from '../../../../lib/locations';

import { Col, Row } from 'antd';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { HoverBox } from '../../../core/components/HoverBox';
import { StorageLocationListItem } from './StorageLocationListItem';

const StorageLocation_ListFragment = graphql(/* GraphQL */ `
  fragment StorageLocation_List on StorageLocation {
    id
    ...StorageLocation_ListItem
  }
`);

type StorageLocationListProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocations?: FragmentType<typeof StorageLocation_ListFragment>[];
};

export const StorageLocationList: React.FC<StorageLocationListProps> = ({
  style,
  className,
  storageLocations: storageLocationsData,
}) => {
  const { t } = useTranslation();
  const materialsDepots = useFragment(
    StorageLocation_ListFragment,
    storageLocationsData,
  );

  return (
    <Row style={style} className={className} gutter={24}>
      {materialsDepots?.map((materialsDepot) => (
        <Col key={materialsDepot.id} xs={24} sm={12} md={8}>
          <HoverBox>
            <Link {...gotoStorageLocation(materialsDepot.id)}>
              <StorageLocationListItem storageLocation={materialsDepot} />
            </Link>
          </HoverBox>
        </Col>
      ))}
    </Row>
  );
};
