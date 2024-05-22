import { colors } from '@/constants/themes';
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Table,
  TableProps,
  TimePicker,
} from 'antd';
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

export const FacilitiesDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  &&:disabled {
    color: gray;
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const StyledTimePicker = styled(TimePicker)`
  width: 100%;

  .anticon {
    color: ${colors.keyColors.blackAlpha};

    &:hover {
      color: ${colors.keyColors.black};
    }
  }
`;
