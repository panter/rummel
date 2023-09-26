import styled from 'styled-components';
import { ProjectsTable } from './ProjectsTable';
import { ProjectBreadcrump } from '../ProjectBreadcrump';

type ProjectsTableContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const ProjectsTableContainer: React.FC<ProjectsTableContainerProps> = ({
  style,
  className,
}) => {
  return (
    <Base style={style} className={className}>
      <ProjectBreadcrump />
      <ProjectsTable />
    </Base>
  );
};
