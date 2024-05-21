import { Button } from 'antd';
import { HeaderWithButton, MessageWrapper, MessagetHeader } from './elements';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Message = () => {
  return (
    <MessageWrapper>
      <MessagetHeader>
        <HeaderWithButton>
          <Button
            size="large"
            ghost
            icon={<ArrowLeftOutlined style={{ color: 'black' }} />}
          />
          <h1>Message</h1>
        </HeaderWithButton>
      </MessagetHeader>
    </MessageWrapper>
  );
};

export default Message;
