import { AdminLayout } from '@/components/Layout';
import { Assignments } from '../components/Assignments/Assignments';
import { useCreateAssignment } from '../api/createAssignment';
import { useFetchAssignments } from '../api/fetchAssignments';
import { useParams } from 'react-router-dom';

const AssignmentsPage = () => {
  const { id } = useParams();
  const {
    mutate: createAssignment,
    isPending,
    isSuccess,
  } = useCreateAssignment();

  const { data: assignments = [], isLoading: isFetchingAssignments } =
    useFetchAssignments({ subject_id: id });

  return (
    <AdminLayout>
      <Assignments
        assignments={assignments}
        isFetching={isFetchingAssignments}
        onCreateAssignment={createAssignment}
        isLoading={isPending}
        isSuccessful={isSuccess}
      />
    </AdminLayout>
  );
};

export default AssignmentsPage;
