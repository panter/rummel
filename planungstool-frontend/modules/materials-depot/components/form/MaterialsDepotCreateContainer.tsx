import { Divider } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { gotoListOfMaterialsDepot } from '../../../../lib/locations';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { useMaterialsDepotCreateForm } from '../../hooks/useMaterialsDepotForm';
import { MaterialsDepotBreadcrump } from '../MaterialsDepotBreadcrump';
import { MaterialsDepotForm } from './MaterialsDepotForm';

type MaterialsDepotCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const MaterialsDepotCreateContainer: React.FC<
  MaterialsDepotCreateContainerProps
> = ({ style, className }) => {
  const router = useRouter();
  const { formMutation, formQuery, schema } = useMaterialsDepotCreateForm(
    (data) => {
      if (!data) {
        router.back();
        return;
      }
      router.push(gotoListOfMaterialsDepot().href);
    },
  );

  return (
    <Base style={style} className={className}>
      <MaterialsDepotBreadcrump create />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <MaterialsDepotForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
