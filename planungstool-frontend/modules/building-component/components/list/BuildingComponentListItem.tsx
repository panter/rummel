import {
  DeleteOutlined,
  FileSearchOutlined,
  HomeOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { Button, Row, Space, Tag, Tooltip, Typography } from 'antd';
import { FragmentType, graphql, useFragment } from '../../../../@generated';

import { capitalize, isNil } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import {
  BuildingComponentPhase,
  BuildingComponentState,
} from '../../../../@generated/graphql';
import {
  gotoBuildingComponentImages,
  gotoListOfSearchRequestInterests,
  gotoMaterialsDepot,
} from '../../../../lib/locations';
import { ImageInList } from '../../../core/components/ImageInList';

const BuildingComponent_ListItemFragment = graphql(/* GraphQL */ `
  fragment BuildingComponent_ListItem on BuildingComponent {
    id
    name
    phase
    createdAt
    componentSn
    componentId
    state
    quantity
    quantityUnit
    materialsDepot {
      id
      shortName
      name
    }
    mainImage {
      id
      url
    }
    searchRequestInterests {
      id
    }
  }
`);

type BuildingComponentListItemProps = {
  style?: React.CSSProperties;
  className?: string;
  onDelete?: (id: string) => void;
  buildingComponent: FragmentType<typeof BuildingComponent_ListItemFragment>;
  materialsDepotId?: string | null;
  showMaterialsDepotName?: boolean;
};

const Base = styled.div`
  position: relative;
`;

const ItemRow = styled(Row).attrs({ align: 'middle' })`
  margin-bottom: 6px;
`;

const ListTags = styled(Tag)`
  &&& span {
    font-size: 14px;
  }
`;

export const DeleteButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const BuildingComponentListItem: React.FC<
  BuildingComponentListItemProps
> = ({
  style,
  className,
  buildingComponent: buildingComponentData,
  materialsDepotId,
  showMaterialsDepotName,
  onDelete,
}) => {
  const { t } = useTranslation();
  const buildingComponent = useFragment(
    BuildingComponent_ListItemFragment,
    buildingComponentData,
  );

  const handleDelete = async (event: any) => {
    event.preventDefault();
    onDelete?.(buildingComponent.id);
  };

  return (
    <Base style={style} className={className}>
      <div style={{ position: 'relative' }}>
        <ImageInList
          style={{ maxHeight: '250px' }}
          src={
            buildingComponent.mainImage?.url ||
            '/images/building-component-placeholder.png'
          }
          alt={`${buildingComponent.id} main image`}
        />
      </div>
      <ItemRow>
        {buildingComponent.componentId} / {buildingComponent.name}
        <Space style={{ marginLeft: 'auto' }}>
          {[BuildingComponentState.Draft].includes(buildingComponent.state) ? (
            <Tooltip title={t('common:common.delete')}>
              <DeleteButton
                size="middle"
                onClick={handleDelete}
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          ) : null}

          <Link {...gotoMaterialsDepot(buildingComponent.materialsDepot.id)}>
            <Button shape="circle" size="middle" icon={<HomeOutlined />} />
          </Link>
          <Link
            {...gotoBuildingComponentImages({
              buildingComponentId: buildingComponent.id,
              materialsDepotId,
            })}
          >
            <Button shape="circle" size="middle" icon={<PictureOutlined />} />
          </Link>
          {buildingComponent.searchRequestInterests?.length > 0 ? (
            <Link
              {...gotoListOfSearchRequestInterests({
                buildingComponentId: buildingComponent.id,
              })}
              style={{ marginLeft: 'auto' }}
            >
              <Tooltip title={t('common:search-request-interest.name')}>
                <Button
                  size="middle"
                  shape="circle"
                  icon={<FileSearchOutlined />}
                />
              </Tooltip>
            </Link>
          ) : null}
        </Space>
      </ItemRow>
      {showMaterialsDepotName ? (
        <ItemRow align="middle">
          {buildingComponent.materialsDepot.name}
        </ItemRow>
      ) : null}
      <ItemRow>
        <Space size={['small', 'small']}>
          <ListTags>
            <Typography.Text>
              {t(
                `common:enums.BuildingComponentState.${
                  capitalize(
                    buildingComponent.state,
                  ) as keyof typeof BuildingComponentState
                }`,
              )}
            </Typography.Text>
          </ListTags>
          <ListTags>
            <Typography.Text>
              {t(
                `common:enums.BuildingComponentPhase.${
                  capitalize(
                    buildingComponent.phase,
                  ) as keyof typeof BuildingComponentPhase
                }`,
              )}
            </Typography.Text>
          </ListTags>
          {buildingComponent.quantity || buildingComponent.quantityUnit ? (
            <ListTags>
              <Typography.Text>
                {buildingComponent.quantity}
                {isNil(buildingComponent.quantity) ? '' : ' '}
              </Typography.Text>
              <Typography.Text>
                {buildingComponent.quantityUnit}
              </Typography.Text>
            </ListTags>
          ) : null}
        </Space>
      </ItemRow>
    </Base>
  );
};
