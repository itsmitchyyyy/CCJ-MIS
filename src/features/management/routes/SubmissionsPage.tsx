import { AdminLayout } from '@/components/Layout';
import { useParams } from 'react-router-dom';
import { Submissions } from '../components/Assignments/Submissions';
import { useFetchStudentAssignments } from '../api/fetchStudentAssignments';
import { useUpdateStudentAssignment } from '../api/updateStudentAssignment';

const SubmissionsPage = () => {
  const { id } = useParams();

  const { data: studentAssignments = [], isLoading } =
    useFetchStudentAssignments({ assignment_id: id, load_relations: true });

  const {
    mutate: updateStudentAssignment,
    isPending,
    isSuccess,
  } = useUpdateStudentAssignment();

  return (
    <AdminLayout>
      <Submissions
        isUpdateSuccess={isSuccess}
        isLoading={isLoading}
        studentAssignments={studentAssignments}
        onScoreUpdate={updateStudentAssignment}
        isSubmitting={isPending}
      />
    </AdminLayout>
  );
};

export default SubmissionsPage;
