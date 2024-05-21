import { AdminLayout } from '@/components/Layout';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import { useGetMessageThread } from '../api/getMessageThread';
import { MessageThreadResponse } from '@/core/domain/dto/message.dto';
import { useSendMessage } from '@/features/account/api/sendMessage';

const MessagePage = () => {
  const { id: messageThreadId } = useParams();

  const { data: messageThread, isFetching: isFetchingThread } =
    useGetMessageThread(messageThreadId || '');

  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    isSuccess: isSendingSuccess,
  } = useSendMessage();

  return (
    <AdminLayout>
      <Message
        messageThread={messageThread as MessageThreadResponse}
        isFetchingThread={isFetchingThread}
        sendMessage={sendMessage}
        isSendingMessage={isSendingMessage}
        isSendingSuccess={isSendingSuccess}
      />
    </AdminLayout>
  );
};

export default MessagePage;
