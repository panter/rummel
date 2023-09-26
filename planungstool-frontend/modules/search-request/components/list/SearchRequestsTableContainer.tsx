import React from 'react';
import { SearchRequestBreadcrumb } from '../SearchRequestBreadcrumb';
import { SearchRequestsTable } from './SearchRequestsTable';
import styled from 'styled-components';
import { useOneProject } from '../../../project/hooks/useOneProject';
import { useQueryParams } from '../../../../lib/useQueryParams';

type SearchRequestsTableContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const SearchRequestsTableContainer: React.FC<
  SearchRequestsTableContainerProps
> = ({ style, className }) => {
  const { projectId } = useQueryParams(['projectId']);
  const { project } = useOneProject(projectId);

  return (
    <Base style={style} className={className}>
      <SearchRequestBreadcrumb project={project} />
      <SearchRequestsTable projectId={project?.id} />
    </Base>
  );
};
