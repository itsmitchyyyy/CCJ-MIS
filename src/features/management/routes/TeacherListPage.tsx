import { AdminLayout } from '@/components/Layout';
import { TeacherList } from '../components/ManagementList/TeacherList';
import { useFetchTeachers } from '../api/fetchTeachers';
import { useCreateTeacherAttendance } from '../api/addTeacherAttendance';
import { useSearchParams } from 'react-router-dom';

const TeacherListPage = () => {
  const [searchParams, _] = useSearchParams();
  const search = searchParams.get('search') || undefined;

  const { data: teachers = [], isLoading } = useFetchTeachers({ search });
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
