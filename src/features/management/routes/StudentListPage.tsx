import { AdminLayout } from '@/components/Layout';
import { StudentList } from '../components/StudentList/StudentList';
import { useFetchStudents } from '../api/fetchStudents';
import { useAddStudentToSubject } from '../api/addStudentToSubject';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchStudentSubject } from '../api/fetchStudentSubject';

const StudentListPage = () => {
  const { data: students = [], isLoading } = useFetchStudents();
  const { mutate: addStudentToSubject, isPending } = useAddStudentToSubject();
  const { id } = useParams();
  const { data: subjectStudents = [], isLoading: isFetchingStudentSubject } =
    useFetchStudentSubject(id || '');

  const onSubmit = (user_id: string[]) => {
    if (!id) {
      toast.error('No subject id found');
      return;
    }

    addStudentToSubject({ subjectId: id, studentId: user_id });
  };

  return (
    <AdminLayout>
      <StudentList
        onSubmit={onSubmit}
        data={students}
        isLoading={isLoading || isFetchingStudentSubject}
        isSubmitting={isPending}
        subjectStudentData={subjectStudents}
      />
    </AdminLayout>
  );
};

export default StudentListPage;
