import { FragmentType, graphql, useFragment } from '../../../../@generated';

import { Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import { MaterialsDepot } from '../../../../@generated/graphql';
import { gotoMaterialsDepot } from '../../../../lib/locations';
import { HoverBox } from '../../../core/components/HoverBox';
import { MaterialsDepotListItem } from './MaterialsDepotListItem';

const MaterialsDepot_ListFragment = graphql(/* GraphQL */ `
  fragment MaterialsDepot_List on MaterialsDepot {
    id
    ...MaterialsDepot_ListItem
  }
`);

type MaterialsDepotListProps = {
  style?: React.CSSProperties;
  className?: string;
  onDelete?: (materialsDepot: MaterialsDepot) => void;
  materialsDepots?: FragmentType<typeof MaterialsDepot_ListFragment>[];
};

export const MaterialsDepotList: React.FC<MaterialsDepotListProps> = ({
  style,
  className,
  onDelete,
  materialsDepots: materialsDepotsData,
}) => {
  const materialsDepots = useFragment(
    MaterialsDepot_ListFragment,
    materialsDepotsData,
  );

  return (
    <Row style={style} className={className} gutter={24}>
      {materialsDepots?.map((materialsDepot) => (
        <Col key={materialsDepot.id} xs={24} sm={12} md={8}>
          <HoverBox>
            <Link {...gotoMaterialsDepot(materialsDepot.id)}>
              <MaterialsDepotListItem
                onDelete={onDelete}
                materialsDepot={materialsDepot}
              />
            </Link>
          </HoverBox>
        </Col>
      ))}
    </Row>
  );
};
