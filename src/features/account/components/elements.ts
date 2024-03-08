import { Button, Select } from 'antd';
import styled from 'styled-components';

export const ManageAccountWrapper = styled.div``;

export const ManageAccountHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CreateAccountButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const ManageAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const StyledSelect = styled(Select)`
  width: 120px;
`;
