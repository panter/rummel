import React from 'react';
import { StorageLocationBreadcrumb } from './StorageLocationBreadcrump';
import { StorageLocationImages } from './StorageLocationImages';
import { graphql } from '../../../@generated';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

export const StorageLocationImagesQuery = graphql(/* GraphQL */ `
  query storageLocationImages($where: EntityIdInput!) {
    storageLocation(where: $where) {
      id
      name
      ...StorageLocationImages
    }
  }
`);

type StorageLocationImagesContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocationId: string;
};

const Base = styled.div``;

export const StorageLocationImagesContainer: React.FC<
  StorageLocationImagesContainerProps
> = ({ style, className, storageLocationId }) => {
  const { data } = useQuery(StorageLocationImagesQuery, {
    variables: { where: { id: storageLocationId } },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Base style={style} className={className}>
      <StorageLocationBreadcrumb storageLocation={data?.storageLocation} />
      <StorageLocationImages storageLocation={data?.storageLocation} />
    </Base>
  );
};
