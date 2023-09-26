import { BuildingComponentForm } from './BuildingComponentForm';
import { BuildingComponentFragment } from '../../resource';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { MaterialsDepotBreadcrump } from '../../../materials-depot/components/MaterialsDepotBreadcrump';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { getFragment } from '../../../../lib/getFragment';
import { gotoMaterialDepotBuildingComponentsList } from '../../../../lib/locations';
import styled from 'styled-components';
import { useBuildingComponentCreateForm } from '../../hooks/useBuildingComponentForm';
import { useRouter } from 'next/router';

type BuildingComponentCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  materialsDepotId: string;
};

const Base = styled.div``;

export const BuildingComponentCreateContainer: React.FC<
  BuildingComponentCreateContainerProps
> = ({ style, className, materialsDepotId }) => {
  const router = useRouter();

  const { formMutation, formQuery } = useBuildingComponentCreateForm(
    materialsDepotId,
    (data) => {
      if (!data) {
        router.back();
        return;
      }

      const allData = getFragment(
        BuildingComponentFragment,
        data?.createOneBuildingComponent,
      );
      if (allData?.materialsDepotId?.id) {
        router.push(
          gotoMaterialDepotBuildingComponentsList(allData?.materialsDepotId?.id)
            .href,
        );
      }
    },
  );

  return (
    <Base style={style} className={className}>
      <MaterialsDepotBreadcrump
        buildingComponent
        materialsDepot={formQuery.model?.materialsDepot}
        create
      />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <BuildingComponentForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <FormFooter
        schemaForm={formMutation}
        closeHidden
        justifyRow="start"
        stick
      />
    </Base>
  );
};
