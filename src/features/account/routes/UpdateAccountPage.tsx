import { AdminLayout } from '@/components/Layout';
import { UpdateAccount } from '../components/UpdateAccount';
import { useFetchAccount } from '../api/fetchAccount';
import { useNavigate, useParams } from 'react-router-dom';
import { AccessType, AccountStatus, UpdateAccountDetail } from '../types';
import { Loader } from '@/components/Elements/Loader';
import { useUpdateAccountDetails } from '@/features/profile/api/updateAccountDetails';
import { useEffect } from 'react';

const UpdateAccountPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const {
    data: response = {
      data: {
        id: '',
        first_name: '',
        last_name: '',
        contact_number: '',
        username: '',
        access_type: AccessType.Admin,
        status: AccountStatus.Active,
        email: '',
      },
    },
    isLoading,
  } = useFetchAccount(id);

  const {
    mutate: updateAccountDetails,
    isSuccess,
    isPending,
  } = useUpdateAccountDetails();

  const onSubmit = (data: UpdateAccountDetail) => {
    updateAccountDetails({ id: data.id, data, hasPutMethod: true });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/account');
    }
  }, [isSuccess]);

  return isLoading ? (
    <Loader />
  ) : (
    <AdminLayout>
      <UpdateAccount
        onSubmit={onSubmit}
        isLoading={isPending}
        user={response.data}
      />
    </AdminLayout>
  );
};

export default UpdateAccountPage;
