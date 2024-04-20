import { Button } from 'antd';
import styled from 'styled-components';

export const AnnouncementWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AnnouncementHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddAnnouncementButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const AnnouncementListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
