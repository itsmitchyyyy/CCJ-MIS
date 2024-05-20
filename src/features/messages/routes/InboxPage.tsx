import { AdminLayout } from '@/components/Layout';
import Inbox from '../components/Inbox';
import { useGetInboxMessages } from '../api/getInboxMessages';
import { useGlobalState } from '@/hooks/global';

const InboxPage = () => {
  const {
    useAuth: { id },
  } = useGlobalState();
  const { data: messages = [], isFetching: isFetchingMessages } =
    useGetInboxMessages({ to_id: id });

  return (
    <AdminLayout>
      <Inbox messages={messages} isFetchingMessages={isFetchingMessages} />
    </AdminLayout>
  );
};

export default InboxPage;
