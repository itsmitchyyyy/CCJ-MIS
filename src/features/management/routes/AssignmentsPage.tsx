import { AdminLayout } from '@/components/Layout';
import { Assignments } from '../components/Assignments/Assignments';
import { useCreateAssignment } from '../api/createAssignment';
import { useFetchAssignments } from '../api/fetchAssignments';
import { useParams } from 'react-router-dom';
import { useCreateStudentAssignment } from '../api/createStudentAssignment';
import { useCheckStudentAssignmentExists } from '../api/checkStudentAssignmentExists';
import { useEffect } from 'react';
import { useGlobalState } from '@/hooks/global';

const AssignmentsPage = () => {
  const {
    useAuth: { id: userId },
  } = useGlobalState();
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

  const { data: studentAssignment = null, isLoading: isCheckingStudentExists } =
    useCheckStudentAssignmentExists(userId, id || '');

  return (
    <AdminLayout>
      <Assignments
        onCreateStudentAssignment={createStudentAssignment}
        assignments={assignments}
        isFetching={isFetchingAssignments || isCheckingStudentExists}
        onCreateAssignment={createAssignment}
        isLoading={isPending || isPendingStudentAssignment}
        isSuccessful={isSuccess || isSuccessStudentAssignment}
        studentAssignment={studentAssignment}
      />
    </AdminLayout>
  );
};

export default AssignmentsPage;
