import { AdminLayout } from '@/components/Layout';
import { ManageAccount } from '../components';
import { useFetchAccounts } from '../api/fetchAccounts';
import { useSearchParams } from 'react-router-dom';
import { AccessType } from '../types';
import { useDeleteAccount } from '../api/deleteAccount';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const AccountPage = () => {
  const [searchParams, _] = useSearchParams();
  const queryClient = useQueryClient();

  const accessType = searchParams.get('access_type');

  const {
    data: response = {
      data: [],
    },
    isLoading,
  } = useFetchAccounts({ access_type: accessType as AccessType });

  const { mutate: deleteAccount, isPending, isSuccess } = useDeleteAccount();

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['fetch-accounts'] });
      console.log('here success');
    }
  }, [isSuccess]);

  return (
    <AdminLayout>
      <ManageAccount
        onDeleteAccount={deleteAccount}
        data={response.data}
        isLoading={isLoading || isPending}
      />
    </AdminLayout>
  );
};

export default AccountPage;
