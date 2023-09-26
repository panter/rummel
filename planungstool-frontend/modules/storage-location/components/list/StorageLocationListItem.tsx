import { Button, Row, Space } from 'antd';
import { FragmentType, graphql, useFragment } from '../../../../@generated';

import { ImageInList } from '../../../core/components/ImageInList';
import Link from 'next/link';
import { PictureOutlined } from '@ant-design/icons';
import React from 'react';
import { gotoStorageLocationImages } from '../../../../lib/locations';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const StorageLocation_ListItemFragment = graphql(/* GraphQL */ `
  fragment StorageLocation_ListItem on StorageLocation {
    id
    name
    country
    canton
    city
    street
    googleMapsLink
    postalCode
    mainImage {
      id
    }
    contacts {
      id
    }
    assets {
      id
    }
    buildingComponents {
      id
    }
    mainImage {
      id
      url
    }
    notes
  }
`);

type StorageLocationListItemProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocation: FragmentType<typeof StorageLocation_ListItemFragment>;
};

const Base = styled.div`
  position: relative;

  overflow: hidden;
  cursor: pointer;
  width: 100%;
`;

export const StorageLocationListItem: React.FC<
  StorageLocationListItemProps
> = ({ style, className, storageLocation: materialsDepotData }) => {
  const { t } = useTranslation();
  const storageLocation = useFragment(
    StorageLocation_ListItemFragment,
    materialsDepotData,
  );
  return (
    <Base style={style} className={className}>
      <div style={{ position: 'relative' }}>
        <ImageInList
          style={{ maxHeight: '250px' }}
          src={
            storageLocation.mainImage?.url ||
            '/images/storage-location-placeholder.png'
          }
          alt={`${storageLocation.name} main image`}
        />
        <Row align="middle">
          {storageLocation.name}
          <Space style={{ marginLeft: 'auto' }}>
            <Link {...gotoStorageLocationImages(storageLocation.id)}>
              <Button size="middle" shape="circle" icon={<PictureOutlined />} />
            </Link>
          </Space>
        </Row>
      </div>
    </Base>
  );
};
