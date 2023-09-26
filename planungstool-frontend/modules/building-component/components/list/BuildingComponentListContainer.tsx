import {
  BuildingComponentListQueryVariables,
  BuildingComponentState,
  SortOrder,
} from '../../../../@generated/graphql';
import { Button, Dropdown, message, Space, Upload } from 'antd';

import { BuildingComponentList } from './BuildingComponentList';
import { BuildingComponentsBreadcrump } from '../BuildingComponentsBreadcrump';
import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import Link from 'next/link';
import { MaterialsDepotBreadcrump } from '../../../materials-depot/components/MaterialsDepotBreadcrump';
import { PublicRuntimeConfig } from '../../../../lib/config';
import React from 'react';
import { StorageLocationBreadcrumb } from '../../../storage-location/components/StorageLocationBreadcrump';
import { gotoCreateNewBuildingComponentFromMaterialsDepot } from '../../../../lib/locations';
import { graphql } from '../../../../@generated';
import styled from 'styled-components';
import { useDeleteBuildingComponent } from '../../hooks/useDeleteBuildingComponent';
import { useFilteredBuildingComponents } from '../../hooks/useFilteredBuildingComponents';
import { useMaterialsDepotReference } from '../../../materials-depot/hooks/useMaterialsDepotReference';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useStorageLocationReference } from '../../../storage-location/hooks/useStorageLocationReference';
import { useTranslation } from 'next-i18next';
import { getUploadProps } from '../../../../utils/upload';

type BuildingComponentListContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  assignedToProjectId?: string;
  assignedSearchRequestId?: string;
  materialsDepotId?: string;
  storageLocationId?: string;
};

export const BuildingComponentListQuery = graphql(/* GraphQL */ `
  query buildingComponentList(
    $where: BuildingComponentWhereInput
    $orderBy: [BuildingComponentOrderByInput!]
  ) {
    buildingComponents(where: $where, orderBy: $orderBy) {
      id
      ...BuildingComponent_List
    }
    buildingComponentsCount(where: $where)
  }
`);

const Base = styled.div``;

export const BuildingComponentListContainer: React.FC<
  BuildingComponentListContainerProps
> = ({
  style,
  className,
  materialsDepotId,
  storageLocationId,
  assignedSearchRequestId,
  assignedToProjectId,
}) => {
  const { t } = useTranslation();
  const { materialsDepotRef, loading: loadingMaterialsDepotRef } =
    useMaterialsDepotReference(materialsDepotId);
  const { storageLocationRef, loading: loadingStorageLocationRef } =
    useStorageLocationReference(storageLocationId);

  const where: BuildingComponentListQueryVariables['where'] = {
    assignedTo:
      assignedToProjectId || assignedSearchRequestId
        ? {
            searchRequest: {
              project: assignedToProjectId
                ? { id: { equals: assignedToProjectId } }
                : undefined,
              id: assignedSearchRequestId
                ? { equals: assignedSearchRequestId }
                : undefined,
            },
          }
        : null,
    materialsDepot: materialsDepotId
      ? {
          id: materialsDepotId ? { equals: materialsDepotId } : undefined,
        }
      : undefined,
    storageLocation: storageLocationId
      ? { id: { equals: storageLocationId } }
      : undefined,
  };

  const { setWhere, queryResult } = usePrismaManyTable(
    BuildingComponentListQuery,
    (data) => data.buildingComponentsCount,
    {
      skip:
        Boolean(materialsDepotId && loadingMaterialsDepotRef) ||
        Boolean(storageLocationId && loadingStorageLocationRef),
      take: 9999,
      orderBy: [{ createdAt: SortOrder.Desc }],
      where,
    },
  );

  const { onDelete } = useDeleteBuildingComponent({
    onSuccess: () => queryResult.refetch(),
  });

  const { filterConfig, filter, setFilter } = useFilteredBuildingComponents({
    setWhere: (_where) =>
      setWhere({
        ..._where,
        ...where,
      }),
    initialFilter: {
      state: [BuildingComponentState.Active, BuildingComponentState.Draft],
    },
  });

  const backendEndpoint = PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT');

  let exportLink = `${backendEndpoint}/building-component/export/csv`;
  if (materialsDepotId) {
    exportLink = `${exportLink}?materialsDepotId=${materialsDepotId}`;
  } else if (storageLocationId) {
    exportLink = `${exportLink}?storageLocationId=${storageLocationId}`;
  } else if (assignedSearchRequestId) {
    exportLink = `${exportLink}?searchRequestId=${assignedSearchRequestId}`;
  } else if (assignedToProjectId) {
    exportLink = `${exportLink}?projectId=${assignedToProjectId}`;
  }

  const getBCUploadProps = (importType: '1' | '2' | '3') => {
    return getUploadProps('building-component', {
      queryParams: {
        materialsDepotId: materialsDepotId || undefined,
        type: importType,
        importType,
      },
      onSuccess: (info) => {
        message.success(`${info.file.name} processed successfully`);
        return queryResult.refetch();
      },
    });
  };

  return (
    <Base style={style} className={className}>
      {materialsDepotId && !storageLocationId ? (
        <MaterialsDepotBreadcrump
          materialsDepot={materialsDepotRef}
          buildingComponent
        />
      ) : null}
      {!materialsDepotId && storageLocationId ? (
        <StorageLocationBreadcrumb
          buildingComponents
          storageLocation={storageLocationRef}
        />
      ) : null}
      {!materialsDepotId &&
      !storageLocationId &&
      !assignedToProjectId &&
      !assignedSearchRequestId ? (
        <BuildingComponentsBreadcrump />
      ) : null}

      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
        <Space>
          <Link
            href={exportLink}
            target="_blank"
            rel="noreferrer"
            download="building-components"
            passHref
          >
            <Button icon={<DownloadOutlined />}>
              {t('common:common.export')}
            </Button>
          </Link>
          <Dropdown
            placement="bottomLeft"
            arrow
            menu={{
              items: materialsDepotId
                ? [
                    {
                      key: '1',
                      label: (
                        <Upload {...getBCUploadProps('1')}>Bauteilliste</Upload>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <Upload {...getBCUploadProps('2')}>
                          Gebäudescreening
                        </Upload>
                      ),
                    },
                  ]
                : [
                    {
                      key: '3',
                      label: (
                        <Upload {...getBCUploadProps('2')}>Bauteilpass</Upload>
                      ),
                    },
                  ],
            }}
          >
            <Button icon={<UploadOutlined />}>
              {t('common:common.import')}
            </Button>
          </Dropdown>
          {/*<Upload {...uploadProps}>*/}
          {/*  <Button icon={<UploadOutlined />}>*/}
          {/*    {t('common:common.import')}*/}
          {/*  </Button>*/}
          {/*</Upload>*/}
          {materialsDepotRef ? (
            <Link
              {...gotoCreateNewBuildingComponentFromMaterialsDepot(
                materialsDepotRef.id,
              )}
            >
              <Button icon={<PlusOutlined />} />
            </Link>
          ) : null}
        </Space>
      </FilterPanel>
      <BuildingComponentList
        buildingComponents={queryResult?.data?.buildingComponents}
        onDelete={onDelete}
        materialsDepot={materialsDepotRef}
      />
    </Base>
  );
};
