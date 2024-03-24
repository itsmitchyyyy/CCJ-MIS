import { AdminLayout } from '@/components/Layout';
import { Attendance } from '../components/Attendance/Attendance';
import { useFetchStudentSubject } from '../api/fetchStudentSubject';
import { useParams } from 'react-router-dom';

const AttendancePage = () => {
  const { id } = useParams();
  const { data: students = [], isLoading } = useFetchStudentSubject(id || '');

  return (
    <AdminLayout>
      <Attendance students={students} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default AttendancePage;
