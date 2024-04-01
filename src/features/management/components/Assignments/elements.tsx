import { colors } from '@/constants/themes';
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Table,
  TableProps,
} from 'antd';
import styled from 'styled-components';

export const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AssignmentstHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CreateAssignmentsButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const Wrapper = styled.div``;

export const StyledTextArea = styled(Input.TextArea)`
  && {
    resize: none;
  }
`;

export const AssignmentsDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;

export const StyledTable = styled((props: TableProps) => <Table {...props} />)`
  .ant-empty-description {
    color: ${colors.keyColors.black};
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;
