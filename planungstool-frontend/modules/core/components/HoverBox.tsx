import { styled } from 'styled-components';

export const HoverBox = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
