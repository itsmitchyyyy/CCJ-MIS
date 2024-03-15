import { AdminLayout } from '@/components/Layout';
import ManagementList from '../components/ManagementList/ManagementList';
import { useFetchSubjects } from '../api/fetchSubjects';

const ManagementPage = () => {
  const { data: subjects = [], isLoading } = useFetchSubjects();

  return (
    <AdminLayout>
      <ManagementList subjects={subjects} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default ManagementPage;
