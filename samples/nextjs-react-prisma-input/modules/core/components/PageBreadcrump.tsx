import { styled } from 'styled-components';
import { mediaQueries } from '../mediaQuery';

export const BreadcrumpPanel = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;

  > {
    :first-child {
      margin-bottom: 12px;
    }
  }

  ${mediaQueries.sm`
    align-items: center;
    flex-direction: row;

    > {
      :first-child {
        margin-bottom: 0;
        margin-right: 12px;
        flex: 1;
      }
    }
  `}
`;
