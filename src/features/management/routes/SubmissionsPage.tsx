import { AdminLayout } from '@/components/Layout';
import { useParams } from 'react-router-dom';
import { Submissions } from '../components/Assignments/Submissions';
import { useFetchStudentAssignments } from '../api/fetchStudentAssignments';

const SubmissionsPage = () => {
  const { id } = useParams();

  const { data: studentAssignments = [], isLoading } =
    useFetchStudentAssignments({ assignment_id: id, load_relations: true });

  return (
    <AdminLayout>
      <Submissions
        isLoading={isLoading}
        studentAssignments={studentAssignments}
      />
    </AdminLayout>
  );
};

export default SubmissionsPage;
