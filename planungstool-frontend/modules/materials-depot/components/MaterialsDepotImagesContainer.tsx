import { MaterialsDepotBreadcrump } from './MaterialsDepotBreadcrump';
import { MaterialsDepotImages } from './MaterialsDepotImages';
import React from 'react';
import { graphql } from '../../../@generated';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

export const MaterialsDepotImagesQuery = graphql(/* GraphQL */ `
  query materialsDepotImages($where: EntityIdInput!) {
    materialsDepot(where: $where) {
      id
      shortName
      ...MaterialsDepotImages
    }
  }
`);

type MaterialsDepotImagesContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  materialsDepotId: string;
};

const Base = styled.div``;

export const MaterialsDepotImagesContainer: React.FC<
  MaterialsDepotImagesContainerProps
> = ({ style, className, materialsDepotId }) => {
  const q = useQuery(MaterialsDepotImagesQuery, {
    variables: { where: { id: materialsDepotId } },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Base style={style} className={className}>
      <MaterialsDepotBreadcrump
        materialsDepot={q.data?.materialsDepot}
        images
      />

      <MaterialsDepotImages materialsDepot={q.data?.materialsDepot} />
    </Base>
  );
};
