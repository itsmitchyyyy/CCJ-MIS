import { AdminLayout } from '@/components/Layout';
import { StudentList } from '../components/StudentList/StudentList';

const StudentListPage = () => {
  return (
    <AdminLayout>
      <StudentList />
    </AdminLayout>
  );
};

export default StudentListPage;
