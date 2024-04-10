import { AdminLayout } from '@/components/Layout';
import { TeacherList } from '../components/ManagementList/TeacherList';

const TeacherListPage = () => {
  return (
    <AdminLayout>
      <TeacherList />
    </AdminLayout>
  );
};

export default TeacherListPage;
