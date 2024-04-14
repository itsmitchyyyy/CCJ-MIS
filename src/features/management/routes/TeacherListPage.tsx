import { AdminLayout } from '@/components/Layout';
import { TeacherList } from '../components/ManagementList/TeacherList';
import { useFetchTeachers } from '../api/fetchTeachers';

const TeacherListPage = () => {
  const { data: teachers = [], isLoading } = useFetchTeachers();

  return (
    <AdminLayout>
      <TeacherList teachers={teachers} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default TeacherListPage;
