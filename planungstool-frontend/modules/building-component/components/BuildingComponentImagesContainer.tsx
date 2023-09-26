import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { graphql } from '../../../@generated';
import { BuildingComponentImages } from './BuildingComponentImages';
import { BuildingComponentsBreadcrump } from './BuildingComponentsBreadcrump';

export const BuildingComponentImagesQuery = graphql(/* GraphQL */ `
  query BuildingComponentImages($where: EntityIdInput!) {
    buildingComponent(where: $where) {
      id
      ...BuildingComponentImages
    }
  }
`);

type BuildingComponentImagesContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  buildingComponentId: string;
};

const Base = styled.div``;

export const BuildingComponentImagesContainer: React.FC<
  BuildingComponentImagesContainerProps
> = ({ style, className, buildingComponentId }) => {
  const q = useQuery(BuildingComponentImagesQuery, {
    variables: { where: { id: buildingComponentId } },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Base style={style} className={className}>
      <BuildingComponentsBreadcrump
        buildingComponent={q.data?.buildingComponent}
      />

      <BuildingComponentImages buildingComponent={q.data?.buildingComponent} />
    </Base>
  );
};
