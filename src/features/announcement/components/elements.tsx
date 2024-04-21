import { colors } from '@/constants/themes';
import { Button, Input } from 'antd';
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
  margin-top: 1em;
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
