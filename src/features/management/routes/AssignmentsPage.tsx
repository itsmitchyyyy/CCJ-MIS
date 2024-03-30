import { AdminLayout } from '@/components/Layout';
import { Assignments } from '../components/Assignments/Assignments';
import { useCreateAssignment } from '../api/createAssignment';
import { useFetchAssignments } from '../api/fetchAssignments';
import { useParams } from 'react-router-dom';
import { useCreateStudentAssignment } from '../api/createStudentAssignment';

const AssignmentsPage = () => {
  const { id } = useParams();
  const {
    mutate: createAssignment,
    isPending,
    isSuccess,
  } = useCreateAssignment();

  const { data: assignments = [], isLoading: isFetchingAssignments } =
    useFetchAssignments({ subject_id: id });

  const {
    mutate: createStudentAssignment,
    isPending: isPendingStudentAssignment,
    isSuccess: isSuccessStudentAssignment,
  } = useCreateStudentAssignment();

  return (
    <AdminLayout>
      <Assignments
        onCreateStudentAssignment={createStudentAssignment}
        assignments={assignments}
        isFetching={isFetchingAssignments}
        onCreateAssignment={createAssignment}
        isLoading={isPending || isPendingStudentAssignment}
        isSuccessful={isSuccess || isSuccessStudentAssignment}
      />
    </AdminLayout>
  );
};

export default AssignmentsPage;
