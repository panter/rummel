import { Collapse, Divider, Row } from 'antd';
import { FragmentType, graphql, useFragment } from '../../../@generated';

import { useTranslation } from 'next-i18next';
import React from 'react';
import { ImageGallery } from '../../ui/images/antd/ImageGallery';

export const StorageLocationImagesFragment = graphql(/* GraphQL */ `
  fragment StorageLocationImages on StorageLocation {
    id
    name
    assets {
      id
      tags
      asset {
        id
        url
        mimeType
        originalFilename
        updatedAt
      }
    }
    buildingComponents {
      id
      componentId
      assets {
        id
        tags
        asset {
          id
          url
          mimeType
          originalFilename
          updatedAt
        }
      }
    }
  }
`);

type StorageLocationFormProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocation?: FragmentType<typeof StorageLocationImagesFragment> | null;
};

export const StorageLocationImages: React.FC<StorageLocationFormProps> = ({
  storageLocation: storageLocationData,
}) => {
  const { t } = useTranslation();
  const storageLocation = useFragment(
    StorageLocationImagesFragment,
    storageLocationData,
  );

  return (
    <div>
      <Divider orientation="left" orientationMargin={0}>
        {t('common:common.images')}
      </Divider>
      <Row gutter={[16, 32]}>
        <ImageGallery assetReferences={storageLocation?.assets} />
      </Row>

      <Divider orientation="left" orientationMargin={0}>
        {t('common:resources.StorageLocation.fields.buildingComponents')}
      </Divider>
      <Collapse
        size="large"
        items={storageLocation?.buildingComponents?.map(
          (buildingComponent) => ({
            key: buildingComponent?.id,
            label: buildingComponent?.componentId,
            children: (
              <ImageGallery assetReferences={buildingComponent?.assets} />
            ),
          }),
        )}
      />
    </div>
  );
};
