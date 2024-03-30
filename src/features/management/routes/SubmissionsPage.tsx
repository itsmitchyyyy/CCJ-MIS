import { AdminLayout } from '@/components/Layout';
import { useParams } from 'react-router-dom';
import { Submissions } from '../components/Assignments/Submissions';

const SubmissionsPage = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <Submissions />
    </AdminLayout>
  );
};

export default SubmissionsPage;
