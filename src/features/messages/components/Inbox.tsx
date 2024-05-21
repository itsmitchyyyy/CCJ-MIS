import { Message, MessageStatus } from '@/core/domain/dto/message.dto';
import {
  MessageWrapper,
  MessagetHeader,
  StyledList,
  Wrapper,
} from './elements';
import { Card, List } from 'antd';
import { inboxDateFormatter } from '@/utils/format';
import { colors } from '@/constants/themes';
import { useNavigate } from 'react-router-dom';

type Props = {
  messages: Message[];
  isFetchingMessages?: boolean;
};

const Inbox = ({ messages, isFetchingMessages }: Props) => {
  const navigate = useNavigate();

  return (
    <MessageWrapper>
      <MessagetHeader>
        <h1>Inbox</h1>
      </MessagetHeader>

      <Wrapper>
        <StyledList
          bordered
          dataSource={messages}
          loading={isFetchingMessages}
          renderItem={(item) => (
            <List.Item
              onClick={() => navigate(`/messages/inbox/${item.id}`)}
              key={item.id}
              style={{
                background:
                  item.status === MessageStatus.READ
                    ? colors.keyColors.read
                    : 'initial',
              }}>
              <List.Item.Meta title={item.subject} description={item.message} />
              <div>{inboxDateFormatter(item.sent_at)}</div>
            </List.Item>
          )}
        />
      </Wrapper>
    </MessageWrapper>
  );
};

export default Inbox;
