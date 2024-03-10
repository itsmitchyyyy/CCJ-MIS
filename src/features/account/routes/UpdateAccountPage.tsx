import { AdminLayout } from '@/components/Layout';
import { UpdateAccount } from '../components/UpdateAccount';
import { useFetchAccount } from '../api/fetchAccount';
import { useParams } from 'react-router-dom';
import { AccessType, AccountStatus, UpdateAccountDetail } from '../types';
import { Loader } from '@/components/Elements/Loader';

const UpdateAccountPage = () => {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    isLoading,
  } = useFetchAccount(id);

  const onSubmit = (data: UpdateAccountDetail) => {
    console.log(data);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AdminLayout>
      <UpdateAccount
        onSubmit={onSubmit}
        isLoading={isLoading}
        user={response.data}
      />
    </AdminLayout>
  );
};

export default UpdateAccountPage;
