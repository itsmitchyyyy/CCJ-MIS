import { Button } from 'antd';
import styled from 'styled-components';

export const ManagementWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ManagementHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CreateSubjectButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const Wrapper = styled.div``;

export const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

export const StyledCardContentDescription = styled.div`
  margin-top: 1em;
`;
