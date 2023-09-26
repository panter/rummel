import styled from 'styled-components';

const Base = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`;

type TableActionsProps<T> = {
  record: T;
};

export function TableActions<T>(props: TableActionsProps<T>): React.ReactNode {
  return <Base></Base>;
}
