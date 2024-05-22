import { colors } from '@/constants/themes';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { Flex, Select, Table, TableProps } from 'antd';
import styled from 'styled-components';

export const StyledFlex = styled(Flex)`
  width: 100%;
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;

export const AttendanceRecordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AttendanceRecordsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AttendanceRecordsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
`;

export const StyledTable = styled((props: TableProps) => <Table {...props} />)`
  .ant-empty-description {
    color: ${colors.keyColors.black};
  }
`;

export const AttendanceStatusWrapper = styled.span.withConfig({
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

export const StyledSelect = styled(Select)`
  width: 120px;
`;
