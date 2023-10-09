import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  font-size: 14px;
  color: black;
`;

export const TableHeader = styled.thead``;

export const TableHeaderCol = styled.th`
  padding: 6px;
  border-bottom: 1px solid black;
  text-align: left;
`;

export const TableRow = styled.tr``;

export const TableBody = styled.tbody`
  ${TableRow}:hover {
    cursor: pointer;
    background: white;
  }
`;

export const TableCol = styled.td`
  font-weight: normal;
  padding: 6px;
`;

export const TableColCut = styled(TableCol)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
