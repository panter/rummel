import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { graphql } from '../../../@generated';
import { ProjectBreadcrump } from './ProjectBreadcrump';
import { ProjectImages } from './ProjectImages';

export const ProjectImagesQuery = graphql(/* GraphQL */ `
  query ProjectImages($where: EntityIdInput!) {
    project(where: $where) {
      id
      shortName
      ...ProjectImages
    }
  }
`);

type ProjectImagesContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  projectId: string;
};

const Base = styled.div``;

export const ProjectImagesContainer: React.FC<ProjectImagesContainerProps> = ({
  style,
  className,
  projectId,
}) => {
  const q = useQuery(ProjectImagesQuery, {
    variables: { where: { id: projectId } },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Base style={style} className={className}>
      <ProjectBreadcrump project={q.data?.project} />

      <ProjectImages project={q.data?.project} />
    </Base>
  );
};
