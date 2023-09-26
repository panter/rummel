import styled from 'styled-components';
import { mediaQueries } from '../../core/mediaQuery';

export const FilterPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-direction: column;
  align-items: flex-start;

  > div {
    margin-bottom: 12px;
  }

  ${mediaQueries.sm`
    flex-direction: row;
    align-items: center;

    > div {
      margin-bottom: 0;
    }
    > {
      :first-child {
        margin-right: 12px;
        flex: 1;
      }
    }
  `}
`;

export const FilterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterItemLabel = styled.div`
  font-size: 14px;
  padding: 0 6px;
`;
