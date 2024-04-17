import { colors } from '@/constants/themes';
import { Button, Input, Select, Table, TableProps } from 'antd';
import styled from 'styled-components';

export const FacilitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FacilitiesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddFacilityButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const FacilitiesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const StyledTable = styled((props: TableProps) => <Table {...props} />)`
  .ant-empty-description {
    color: ${colors.keyColors.black};
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const StyledSelect = styled(Select)`
  width: 120px;
`;

export const StyledTextArea = styled(Input.TextArea)`
  && {
    resize: none;
  }
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;
