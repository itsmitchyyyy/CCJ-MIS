import { colors } from '@/constants/themes';
import { Button, Table, TableProps } from 'antd';
import styled from 'styled-components';

export const DocumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DocumentsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UploadButton = styled(Button)`
  display: flex;
  justify-content: end;
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
