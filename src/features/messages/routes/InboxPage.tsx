import { AdminLayout } from '@/components/Layout';
import Inbox from '../components/Inbox';
import { useGetInboxMessages } from '../api/getInboxMessages';
import { useGlobalState } from '@/hooks/global';
import { useMarkAsRead } from '../api/markAsRead';

const InboxPage = () => {
  const {
    useAuth: { id },
  } = useGlobalState();

  const { data: messages = [], isFetching: isFetchingMessages } =
    useGetInboxMessages({
      to_id: id,
      isGroup: true,
    });

  const { mutate: markAsRead } = useMarkAsRead();

  return (
    <AdminLayout>
      <Inbox
        messages={messages}
        isFetchingMessages={isFetchingMessages}
        onMarkAsRead={markAsRead}
      />
    </AdminLayout>
  );
};

export default InboxPage;
