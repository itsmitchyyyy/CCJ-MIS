import { colors } from '@/constants/themes';
import { TableProps, Table } from 'antd';
import styled from 'styled-components';

export const StudentListWrapper = styled.div``;

export const StudentListHeader = styled.div`
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

export const StudentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
