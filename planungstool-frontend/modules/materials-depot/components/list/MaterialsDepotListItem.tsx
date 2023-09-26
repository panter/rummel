import { Button, Row, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  FileSearchOutlined,
  PictureOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { FragmentType, graphql, useFragment } from '../../../../@generated';
import {
  MaterialsDepot,
  MaterialsDepotState,
} from '../../../../@generated/graphql';
import {
  gotoListOfSearchRequestInterests,
  gotoMaterialDepotBuildingComponent,
  gotoMaterialDepotBuildingComponentsList,
  gotoMaterialsDepotImages,
} from '../../../../lib/locations';

import { ImageInList } from '../../../core/components/ImageInList';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const MaterialsDepot_ListItemFragment = graphql(/* GraphQL */ `
  fragment MaterialsDepot_ListItem on MaterialsDepot {
    id
    shortName
    name
    state
    mainImage {
      id
      url
    }
    buildingComponents {
      id
      name
    }
    searchInterests
  }
`);

type MaterialsDepotListItemProps = {
  style?: React.CSSProperties;
  className?: string;
  onDelete?: (materialsDepot: MaterialsDepot) => void;
  materialsDepot: FragmentType<typeof MaterialsDepot_ListItemFragment>;
};

const Base = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
`;

export const DeleteButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const MaterialsDepotListItem: React.FC<MaterialsDepotListItemProps> = ({
  style,
  className,
  onDelete,
  materialsDepot: materialsDepotData,
}) => {
  const { t } = useTranslation();
  const materialsDepot = useFragment(
    MaterialsDepot_ListItemFragment,
    materialsDepotData,
  );

  const handleDelete = async (event: any) => {
    event.preventDefault();
    onDelete?.(materialsDepot as MaterialsDepot);
  };

  return (
    <Base style={style} className={className}>
      <div style={{ position: 'relative' }}>
        <ImageInList
          style={{ maxHeight: '250px' }}
          src={
            materialsDepot.mainImage?.url ||
            '/images/materials-depot-placeholder.png'
          }
          alt={`${materialsDepot.shortName} main image`}
        />
        <Row align="middle">
          {materialsDepot.shortName} - {materialsDepot.name}
          <Space style={{ marginLeft: 'auto' }}>
            {[MaterialsDepotState.Draft].includes(materialsDepot.state) ? (
              <Tooltip title={t('common:common.delete')}>
                <DeleteButton
                  size="middle"
                  onClick={handleDelete}
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            ) : null}
            <Link
              {...gotoMaterialDepotBuildingComponentsList(materialsDepot.id)}
            >
              <Button shape="circle" size="middle" icon={<WindowsOutlined />} />
            </Link>
            <Link {...gotoMaterialsDepotImages(materialsDepot.id)}>
              <Button shape="circle" size="middle" icon={<PictureOutlined />} />
            </Link>
            {(materialsDepot?.searchInterests || [])?.length > 0 ? (
              <Link
                {...gotoListOfSearchRequestInterests({
                  materialsDepotId: materialsDepot.id,
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
        </Row>
      </div>
    </Base>
  );
};
