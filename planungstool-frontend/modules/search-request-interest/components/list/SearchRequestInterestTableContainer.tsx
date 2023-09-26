import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { gotoCreateNewSearchRequestInterest } from '../../../../lib/locations';
import { useSearchRequestProject } from '../../../search-request/hooks/useSearchRequestProject';
import { SearchRequestInterestBreadcrumb } from '../SearchRequestInterestBreadcrumb';
import { SearchRequestInterestsTable } from './SearchRequestInterestsTable';

type SearchRequestInterestTableContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  projectId?: string;
  searchRequestId?: string;
  buildingComponentId?: string;
  materialsDepotId?: string;
};

const Base = styled.div``;

export const SearchRequestInterestTableContainer: React.FC<
  SearchRequestInterestTableContainerProps
> = ({
  style,
  className,
  projectId,
  searchRequestId,
  buildingComponentId,
  materialsDepotId,
}) => {
  const { searchRequest } = useSearchRequestProject(searchRequestId);

  if (projectId && searchRequestId && !searchRequest) {
    return null;
  }

  return (
    <Base style={style} className={className}>
      <SearchRequestInterestBreadcrumb searchRequest={searchRequest} />
      <SearchRequestInterestsTable
        additionalActions={
          <Link
            {...gotoCreateNewSearchRequestInterest({
              searchRequestId,
              buildingComponentId,
            })}
          >
            <Button icon={<PlusOutlined />} />
          </Link>
        }
        where={{
          buildingComponent: buildingComponentId
            ? { id: { equals: buildingComponentId } }
            : undefined,
          ...(searchRequestId
            ? { searchRequest: { id: { equals: searchRequestId } } }
            : {}),
          ...(materialsDepotId
            ? {
                searchRequest: {
                  interests: {
                    buildingComponent: {
                      materialsDepot: {
                        id: { equals: materialsDepotId },
                      },
                    },
                  },
                },
              }
            : {}),
          ...(projectId
            ? {
                searchRequest: {
                  project: projectId
                    ? { id: { equals: projectId } }
                    : undefined,
                },
              }
            : {}),
        }}
      />
    </Base>
  );
};
