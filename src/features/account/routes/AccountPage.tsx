import { AdminLayout } from '@/components/Layout';
import { ManageAccount } from '../components';
import { useFetchAccounts } from '../api/fetchAccounts';
import { useSearchParams } from 'react-router-dom';
import { AccessType } from '../types';

const AccountPage = () => {
  const [searchParams, _] = useSearchParams();

  const accessType = searchParams.get('access_type');

  const {
    data: response = {
      data: [],
    },
    isLoading,
  } = useFetchAccounts({ access_type: accessType as AccessType });

  return (
    <AdminLayout>
      <ManageAccount data={response.data} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default AccountPage;
