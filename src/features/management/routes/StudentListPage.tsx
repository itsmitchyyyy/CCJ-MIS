import { AdminLayout } from '@/components/Layout';
import { StudentList } from '../components/StudentList/StudentList';
import { useFetchStudents } from '../api/fetchStudents';
import { useAddStudentToSubject } from '../api/addStudentToSubject';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchStudentSubject } from '../api/fetchStudentSubject';
import { useDeleteStudentFromSubject } from '../api/deleteStudentFromSubject';
import { useCreateAttendance } from '../api/addAttendance';

const StudentListPage = () => {
  const { data: students = [], isLoading } = useFetchStudents();
  const {
    mutate: addStudentToSubject,
    isPending,
    isSuccess,
  } = useAddStudentToSubject();
  const { id } = useParams();
  const { data: subjectStudents = [], isLoading: isFetchingStudentSubject } =
    useFetchStudentSubject(id || '');
  const { mutate: deleteStudentFromSubject, isPending: isDeletingStudent } =
    useDeleteStudentFromSubject();
  const {
    mutate: createAttendance,
    isPending: isPendingAttendance,
    isSuccess: isCreateAttendanceSuccess,
  } = useCreateAttendance();

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
        onCreateAttendance={createAttendance}
        isAdded={isSuccess || isCreateAttendanceSuccess}
        onDelete={deleteStudentFromSubject}
        onSubmit={onSubmit}
        data={students}
        isLoading={isLoading || isFetchingStudentSubject || isDeletingStudent}
        isSubmitting={isPending || isPendingAttendance}
        subjectStudentData={subjectStudents}
      />
    </AdminLayout>
  );
};

export default StudentListPage;
