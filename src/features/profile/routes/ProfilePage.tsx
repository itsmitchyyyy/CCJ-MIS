import { AdminLayout } from '@/components/Layout';
import Profile from '../components/Profile/Profile';
import { useProfileDetails } from '../api/getProfileDetails';
import { convertJsonToCamelCase } from '@/utils/json';
import { useUpdateAccountDetails } from '../api/updateAccountDetails';
import { Loader } from '@/components/Elements/Loader';
import { UpdateAccountDetails } from '../types';
import { useChangePassword } from '@/features/auth/api/changePassword';

const ProfilePage = () => {
  const { data, isLoading } = useProfileDetails();
  const {
    mutate: updateAccountDetails,
    isSuccess,
    isPending,
  } = useUpdateAccountDetails();

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const onSubmit = (data: UpdateAccountDetails & { id: string }) => {
    const { id, ...rest } = data;
    updateAccountDetails({ id: data.id, data: rest, hasPutMethod: true });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Profile
        onChangePassword={changePassword}
        onSubmit={onSubmit}
        detail={convertJsonToCamelCase(data)}
        isLoading={isPending || isChangingPassword}
        isSuccess={isSuccess}
      />
    </AdminLayout>
  );
};

export default ProfilePage;
