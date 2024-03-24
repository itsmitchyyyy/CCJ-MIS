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
