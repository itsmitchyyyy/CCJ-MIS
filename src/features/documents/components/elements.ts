import { colors } from '@/constants/themes';
import { Button } from 'antd';
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
