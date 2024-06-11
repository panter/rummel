import styled from 'styled-components';

/**
 *
 * <FormWrapper><div>top</div><div>bottom</div></FormWrapper>
 */
export const FormWithBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-x: hidden;
  padding: 10px 0;
`;

export const FormContainer = styled.div`
  display: grid;
  gap: 8px;
  line-height: 1.3;
`;
