import { FragmentType, graphql, useFragment } from '../../../../@generated';
import {
  gotoBuildingComponent,
  gotoMaterialDepotBuildingComponent,
} from '../../../../lib/locations';

import { Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useQueryParams } from '../../../../lib/useQueryParams';
import { HoverBox } from '../../../core/components/HoverBox';
import { BuildingComponentListItem } from './BuildingComponentListItem';

const BuildingComponent_ListFragment = graphql(/* GraphQL */ `
  fragment BuildingComponent_List on BuildingComponent {
    id
    state
    phase
    materialsDepot {
      id
      shortName
    }
    storageLocation {
      id
      name
    }
    searchRequestInterests {
      id
    }
    assignedTo {
      id
    }
    ...BuildingComponent_ListItem
  }
`);

type BuildingComponentListProps = {
  style?: React.CSSProperties;
  className?: string;
  onDelete?: (id: string) => void;
  buildingComponents?: FragmentType<typeof BuildingComponent_ListFragment>[];
  materialsDepot?: { id: string; shortName: string } | null;
};

export const BuildingComponentList: React.FC<BuildingComponentListProps> = ({
  style,
  className,
  onDelete,
  buildingComponents: buildingComponentsData,
}) => {
  const { materialsDepotId } = useQueryParams(['materialsDepotId']);
  const buildingComponents = useFragment(
    BuildingComponent_ListFragment,
    buildingComponentsData,
  );

  return (
    <Row style={style} className={className} gutter={24}>
      {buildingComponents?.map((buildingComponent) => (
        <Col key={buildingComponent.id} xs={24} sm={12} md={8}>
          <HoverBox>
            <Link
              {...(materialsDepotId
                ? gotoMaterialDepotBuildingComponent(
                    buildingComponent.materialsDepot.id,
                    buildingComponent.id,
                  )
                : gotoBuildingComponent(buildingComponent.id))}
            >
              <BuildingComponentListItem
                onDelete={onDelete}
                buildingComponent={buildingComponent}
                materialsDepotId={materialsDepotId}
                showMaterialsDepotName={!materialsDepotId}
              />
            </Link>
          </HoverBox>
        </Col>
      ))}
    </Row>
  );
};
