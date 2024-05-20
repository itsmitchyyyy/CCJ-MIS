import { Message, MessageStatus } from '@/core/domain/dto/message.dto';
import { MessageWrapper, MessagetHeader, Wrapper } from './elements';
import { Card, List } from 'antd';
import { inboxDateFormatter } from '@/utils/format';
import { colors } from '@/constants/themes';

type Props = {
  messages: Message[];
  isFetchingMessages?: boolean;
};

const Inbox = ({ messages, isFetchingMessages }: Props) => {
  return (
    <MessageWrapper>
      <MessagetHeader>
        <h1>Inbox</h1>
      </MessagetHeader>

      <Wrapper>
        <List
          bordered
          dataSource={messages}
          loading={isFetchingMessages}
          renderItem={(item) => (
            <List.Item
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
