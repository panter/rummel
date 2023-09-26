import { Divider } from 'antd';
import React from 'react';
import { FragmentType, graphql, useFragment } from '../../../@generated';

import { useTranslation } from 'next-i18next';
import { styled } from 'styled-components';
import { ImageGallery } from '../../ui/images/antd/ImageGallery';

export const ProjectImagesFragment = graphql(/* GraphQL */ `
  fragment ProjectImages on Project {
    id
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

type ProjectImagesProps = {
  style?: React.CSSProperties;
  className?: string;
  project?: FragmentType<typeof ProjectImagesFragment> | null;
};

export const ProjectImages: React.FC<ProjectImagesProps> = ({
  project: projectData,
}) => {
  const { t } = useTranslation();
  const project = useFragment(ProjectImagesFragment, projectData);

  return (
    <Base>
      <Divider orientation="left" orientationMargin={0}>
        {t('common:common.images')}
      </Divider>
      <ImageGallery assetReferences={project?.assets} />
    </Base>
  );
};
