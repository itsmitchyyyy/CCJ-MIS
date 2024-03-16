import { AdminLayout } from '@/components/Layout';
import { StudentList } from '../components/StudentList/StudentList';
import { useFetchStudents } from '../api/fetchStudents';
import { useAddStudentToSubject } from '../api/addStudentToSubject';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentListPage = () => {
  const { data: students = [], isLoading } = useFetchStudents();
  const { mutate: addStudentToSubject, isPending } = useAddStudentToSubject();
  const { id } = useParams();

  const onSubmit = (user_id: string[]) => {
    if (!id) {
      toast.error('No subject id found');
      return;
    }

    addStudentToSubject({ subjectId: id, studentId: user_id });
  };

  return (
    <AdminLayout>
      <StudentList onSubmit={onSubmit} data={students} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default StudentListPage;
