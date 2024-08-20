import { Message, MessageStatus } from '@/core/domain/dto/message.dto';
import {
  MessageWrapper,
  MessagetHeader,
  StyledList,
  Wrapper,
} from './elements';
import { List } from 'antd';
import { inboxDateFormatter } from '@/utils/format';
import { colors } from '@/constants/themes';
import { useNavigate } from 'react-router-dom';

type Props = {
  messages: Message[];
  isFetchingMessages?: boolean;
  onMarkAsRead: (id: string) => void;
};

const Inbox = ({ messages, isFetchingMessages, onMarkAsRead }: Props) => {
  const navigate = useNavigate();

  const handleMarkAsRead = (item: Message) => {
    onMarkAsRead(item.id);

    navigate(`/messages/inbox/${item.message_thread_id}`);
  };

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
              onClick={() => handleMarkAsRead(item)}
              key={item.id}
              style={{
                background:
                  item.status === MessageStatus.READ
                    ? colors.keyColors.read
                    : 'initial',
              }}>
              <List.Item.Meta
                title={item.message_thread.subject}
                description={`${item.send_from.first_name} ${item.send_from.last_name}`}
              />
              <div>{inboxDateFormatter(item.sent_at)}</div>
            </List.Item>
          )}
        />
      </Wrapper>
    </MessageWrapper>
  );
};

export default Inbox;
