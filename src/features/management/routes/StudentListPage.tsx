import { AdminLayout } from '@/components/Layout';
import { StudentList } from '../components/StudentList/StudentList';
import { useFetchStudents } from '../api/fetchStudents';

const StudentListPage = () => {
  const { data: students = [], isLoading } = useFetchStudents();

  return (
    <AdminLayout>
      <StudentList data={students} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default StudentListPage;
