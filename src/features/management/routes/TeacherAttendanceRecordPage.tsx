import { AdminLayout } from '@/components/Layout';
import { AttendanceRecord } from '../components/Attendance/AttendanceRecord';
import { User } from '@/core/domain/entities/user.entity';
import { useFetchTeacherAttendances } from '../api/fetchTeacherAttendances';
import { useFetchTeacher } from '../api/fetchTeacher';
import { useParams } from 'react-router-dom';
import { Loader } from '@/components/Elements/Loader';
import { useCreateTeacherAttendance } from '../api/addTeacherAttendance';

const TeacherAttendanceRecordPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: attendances = [], isLoading } = useFetchTeacherAttendances();
  const { data: teacher, isFetching } = useFetchTeacher(id || '');
  const {
    mutate: createTeacherAttendance,
    isPending,
    isSuccess,
  } = useCreateTeacherAttendance();

  return isFetching ? (
    <Loader />
  ) : (
    <AdminLayout>
      <AttendanceRecord
        user={teacher as User}
        data={attendances}
        isLoading={isLoading}
        onCreateTeacherAttendance={createTeacherAttendance}
        isPendingAttendance={isPending}
        isSuccessAttendance={isSuccess}
      />
    </AdminLayout>
  );
};

export default TeacherAttendanceRecordPage;
