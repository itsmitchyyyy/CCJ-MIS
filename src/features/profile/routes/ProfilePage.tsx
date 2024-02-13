import { AdminLayout } from '@/components/Layout';
import Profile from '../components/Profile/Profile';
import { useProfileDetails } from '../api/getProfileDetails';
import { convertJsonToCamelCase } from '@/utils/json';

const ProfilePage = () => {
  const { data, isLoading } = useProfileDetails();

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <AdminLayout>
      <Profile detail={convertJsonToCamelCase(data)} />
    </AdminLayout>
  );
};

export default ProfilePage;
