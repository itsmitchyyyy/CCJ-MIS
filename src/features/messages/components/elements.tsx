import { colors } from '@/constants/themes';
import { Message } from '@/core/domain/dto/message.dto';
import { List, ListProps } from 'antd';
import styled from 'styled-components';

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessagetHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Wrapper = styled.div`
  margin-top: 2em;
`;

export const StyledList = styled((props: ListProps<Message>) => (
  <List {...props} />
))`
  .ant-list-item:hover {
    cursor: pointer;
    box-shadow: 0 0 4px ${colors.keyColors.listHover};
  }
`;
