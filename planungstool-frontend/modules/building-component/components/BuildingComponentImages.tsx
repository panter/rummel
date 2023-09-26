import { Divider } from 'antd';
import React from 'react';
import { FragmentType, graphql, useFragment } from '../../../@generated';

import { useTranslation } from 'next-i18next';
import { styled } from 'styled-components';
import { ImageGallery } from '../../ui/images/antd/ImageGallery';

export const BuildingComponentImagesFragment = graphql(/* GraphQL */ `
  fragment BuildingComponentImages on BuildingComponent {
    id
    componentId
    assets {
      id
      tags
      asset {
        id
        url
        originalFilename
        mimeType
        updatedAt
      }
    }
  }
`);

const Base = styled.div`
  position: relative;
`;

type BuildingComponentImagesProps = {
  style?: React.CSSProperties;
  className?: string;
  buildingComponent?: FragmentType<
    typeof BuildingComponentImagesFragment
  > | null;
};

export const BuildingComponentImages: React.FC<
  BuildingComponentImagesProps
> = ({ buildingComponent: buildingComponentData }) => {
  const { t } = useTranslation();
  const buildingComponent = useFragment(
    BuildingComponentImagesFragment,
    buildingComponentData,
  );

  return (
    <Base>
      <Divider orientation="left" orientationMargin={0}>
        {t('common:common.images')}
      </Divider>
      <ImageGallery assetReferences={buildingComponent?.assets} />
    </Base>
  );
};
