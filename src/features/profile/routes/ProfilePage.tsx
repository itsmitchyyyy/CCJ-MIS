import { AdminLayout } from '@/components/Layout';
import Profile from '../components/Profile/Profile';
import { useProfileDetails } from '../api/getProfileDetails';
import { convertJsonToCamelCase } from '@/utils/json';
import { useUpdateAccountDetails } from '../api/updateAccountDetails';
import { Loader } from '@/components/Elements/Loader';
import { UpdateAccountDetails } from '../types';

const ProfilePage = () => {
  const { data, isLoading } = useProfileDetails();
  const {
    mutate: updateAccountDetails,
    isSuccess,
    isPending,
  } = useUpdateAccountDetails();

  const onSubmit = (data: UpdateAccountDetails & { id: string }) => {
    const { id, ...rest } = data;
    updateAccountDetails({ id: data.id, data: rest, hasPutMethod: true });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Profile
        onSubmit={onSubmit}
        detail={convertJsonToCamelCase(data)}
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </AdminLayout>
  );
};

export default ProfilePage;
