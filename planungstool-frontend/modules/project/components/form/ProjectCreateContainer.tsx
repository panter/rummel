import { Divider } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { gotoListOfProjects } from '../../../../lib/locations';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { useProjectCreateForm } from '../../hooks/useProjectForm';
import { ProjectBreadcrump } from '../ProjectBreadcrump';
import { ProjectForm } from './ProjectForm';

type ProjectCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const ProjectCreateContainer: React.FC<ProjectCreateContainerProps> = ({
  style,
  className,
}) => {
  const router = useRouter();
  const { formMutation, formQuery } = useProjectCreateForm((data) => {
    if (!data) {
      router.back();
      return;
    }

    router.push(gotoListOfProjects().href);
  });

  return (
    <Base style={style} className={className}>
      <ProjectBreadcrump create />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <ProjectForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
