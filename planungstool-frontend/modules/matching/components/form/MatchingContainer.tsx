import { Col, Empty, Row } from 'antd';

import React from 'react';
import styled from 'styled-components';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import { useFilteredMatching } from '../../hooks/useFilteredMatching';
import { MatchingBuildingComponentList } from './MatchingBuildingComponentList';
import { MatchingSearchRequestList } from './MatchingSearchRequestList';
import { HoverBox } from '../../../core/components/HoverBox';

type MatchingContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

const HoverCol = styled(Col)``;

export const MatchingContainer: React.FC<MatchingContainerProps> = ({
  style,
  className,
}) => {
  const { filterConfig, filter, setFilter, variables } = useFilteredMatching({
    initialFilter: {},
  });

  return (
    <Base style={style} className={className}>
      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
      </FilterPanel>
      {filter?.category ? (
        <Row gutter={24}>
          <HoverCol xs={24} md={12}>
            <HoverBox>
              <MatchingSearchRequestList filter={variables} />
            </HoverBox>
          </HoverCol>
          <HoverCol xs={24} md={12}>
            <HoverBox>
              <MatchingBuildingComponentList filter={variables} />
            </HoverBox>
          </HoverCol>
        </Row>
      ) : (
        <Empty />
      )}
    </Base>
  );
};
