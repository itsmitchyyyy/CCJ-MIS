import { colors } from '@/constants/themes';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { Button, DatePicker, Select, Table, TableProps } from 'antd';
import styled from 'styled-components';

export const AttendanceListWrapper = styled.div``;

export const AttendanceListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTable = styled((props: TableProps) => <Table {...props} />)`
  .ant-empty-description {
    color: ${colors.keyColors.black};
  }
`;

export const AttendanceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const StyledSelect = styled(Select)`
  width: 120px;
`;

export const AttendanceWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})<{ status: AttendanceStatus }>`
  color: ${({ status }) =>
    status === AttendanceStatus.PRESENT
      ? colors.keyColors.primary
      : status === AttendanceStatus.ABSENT
      ? colors.keyColors.danger
      : status === AttendanceStatus.EXCUSE
      ? colors.keyColors.seed
      : colors.keyColors.warning};
  font-weight: 600;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const MarkAttendanceButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const AttendanceSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;
