import { AdminLayout } from '@/components/Layout';
import { TeacherList } from '../components/ManagementList/TeacherList';
import { useFetchTeachers } from '../api/fetchTeachers';
import { useDeleteTeacher } from '../api/deleteTeacher';

const TeacherListPage = () => {
  const { data: teachers = [], isLoading } = useFetchTeachers();
  const { mutate: deleteTeacher, isPending } = useDeleteTeacher();

  return (
    <AdminLayout>
      <TeacherList
        onDelete={deleteTeacher}
        teachers={teachers}
        isLoading={isLoading}
        isDeleting={isPending}
      />
    </AdminLayout>
  );
};

export default TeacherListPage;
