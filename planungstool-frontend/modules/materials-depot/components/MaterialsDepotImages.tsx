import { Button, Collapse, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { FragmentType, graphql, useFragment } from '../../../@generated';

import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';
import { gotoBuildingComponent } from '../../../lib/locations';
import { useQueryParams } from '../../../lib/useQueryParams';
import { CreateOneBuildingComponentMutation } from '../../building-component/resource';
import { ImageGallery } from '../../ui/images/antd/ImageGallery';
import { UpdateOneMaterialsDepotMutation } from '../resource';

export const MaterialsDepotImagesFragment = graphql(/* GraphQL */ `
  fragment MaterialsDepotImages on MaterialsDepot {
    shortName
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
    buildingComponents {
      id
      componentId
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
  }
`);

const Base = styled.div`
  position: relative;
`;

const CreateBuildingComponentButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`;

type MaterialsDepotFormProps = {
  style?: React.CSSProperties;
  className?: string;
  materialsDepot?: FragmentType<typeof MaterialsDepotImagesFragment> | null;
};

export const MaterialsDepotImages: React.FC<MaterialsDepotFormProps> = ({
  materialsDepot: materialsDepotData,
}) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { materialsDepotId } = useQueryParams(['materialsDepotId']);
  const [createBuildingComponent] = useMutation(
    CreateOneBuildingComponentMutation,
  );
  const [updateMaterialsDepot] = useMutation(UpdateOneMaterialsDepotMutation);
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const materialsDepot = useFragment(
    MaterialsDepotImagesFragment,
    materialsDepotData,
  );

  const handleCreateBuildingComponent = async () => {
    const response = await createBuildingComponent({
      variables: {
        data: {
          materialsDepot: {
            connect: {
              id: materialsDepotId,
            },
          },
          assets: {
            create: selectedAssetIds.map((id) => {
              const asset = materialsDepot?.assets?.find(
                (asset) => asset.id === id,
              );
              return {
                asset: {
                  connect: {
                    id,
                  },
                },
                tags: asset?.tags || [],
              };
            }),
          },
        },
      },
    });

    await updateMaterialsDepot({
      variables: {
        data: {
          assets: {
            disconnect: (materialsDepot?.assets || [])
              .filter((asset) =>
                selectedAssetIds.find((id) => asset.asset.id === id),
              )
              .map((asset) => ({ id: asset.id })),
          },
        },
        where: {
          id: materialsDepotId,
        },
      },
    });

    if (response.data?.createOneBuildingComponent.id) {
      push(
        gotoBuildingComponent(response.data?.createOneBuildingComponent.id)
          .href,
      );
    }
  };

  return (
    <Base>
      <Divider orientation="left" orientationMargin={0}>
        {t('common:common.images')}
      </Divider>

      {selectedAssetIds.length ? (
        <CreateBuildingComponentButton onClick={handleCreateBuildingComponent}>
          Create a building component
        </CreateBuildingComponentButton>
      ) : null}

      <ImageGallery
        assetReferences={materialsDepot?.assets}
        selectable
        selectedAssetIds={selectedAssetIds}
        setSelectedAssetIds={setSelectedAssetIds}
      />

      <Divider orientation="left" orientationMargin={0}>
        {t('common:resources.MaterialsDepot.fields.buildingComponents')}
      </Divider>
      <Collapse
        size="large"
        items={materialsDepot?.buildingComponents?.map((buildingComponent) => ({
          key: buildingComponent?.id,
          label: buildingComponent?.componentId,
          children: (
            <Row gutter={[16, 32]}>
              <ImageGallery assetReferences={buildingComponent?.assets} />
            </Row>
          ),
        }))}
      />
    </Base>
  );
};
