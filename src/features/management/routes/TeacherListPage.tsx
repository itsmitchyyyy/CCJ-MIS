import { AdminLayout } from '@/components/Layout';
import { TeacherList } from '../components/ManagementList/TeacherList';
import { useFetchTeachers } from '../api/fetchTeachers';
import { useCreateTeacherAttendance } from '../api/addTeacherAttendance';

const TeacherListPage = () => {
  const { data: teachers = [], isLoading } = useFetchTeachers();
  const {
    mutate: createTeacherAttendance,
    isPending,
    isSuccess,
  } = useCreateTeacherAttendance();

  return (
    <AdminLayout>
      <TeacherList
        onCreateTeacherAttendance={createTeacherAttendance}
        teachers={teachers}
        isLoading={isLoading}
        isPendingAttendance={isPending}
        isSuccessAttendance={isSuccess}
      />
    </AdminLayout>
  );
};

export default TeacherListPage;
