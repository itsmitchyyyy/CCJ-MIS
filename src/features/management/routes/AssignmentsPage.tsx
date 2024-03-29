import { AdminLayout } from '@/components/Layout';
import { Assignments } from '../components/Assignments/Assignments';
import { useCreateAssignment } from '../api/createAssignment';

const AssignmentsPage = () => {
  const { mutate: createAssignment, isPending } = useCreateAssignment();

  return (
    <AdminLayout>
      <Assignments
        onCreateAssignment={createAssignment}
        isLoading={isPending}
      />
    </AdminLayout>
  );
};

export default AssignmentsPage;
