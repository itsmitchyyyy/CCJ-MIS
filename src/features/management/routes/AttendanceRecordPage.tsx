import { AdminLayout } from '@/components/Layout';
import { useParams, useSearchParams } from 'react-router-dom';
import { AttendanceRecord } from '../components/Attendance/AttendanceRecord';
import { useFetchAttendanceBySubjectIdAndStudentId } from '../api/fetchAttendanceBySubjectIdAndStudentId';
import { useFetchStudent } from '../api/fetchStudent';
import { User } from '@/core/domain/entities/user.entity';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { Loader } from '@/components/Elements/Loader';
import { useCreateAttendance } from '../api/addAttendance';

const AttendanceRecordPage = () => {
  const { id, studentId } = useParams();
  const [searchParams, _] = useSearchParams();

  const { data: attendances = [], isLoading } =
    useFetchAttendanceBySubjectIdAndStudentId({
      subject_id: id,
      student_id: studentId,
      status: (searchParams.get('status') as AttendanceStatus) || undefined,
      date: searchParams.get('date') || undefined,
    });

  const { data: student, isLoading: isFetchingStudent } = useFetchStudent(
    studentId || '',
  );
  const {
    mutate: createAttendance,
    isPending: isPendingAttendance,
    isSuccess: isCreateAttendanceSuccess,
  } = useCreateAttendance();

  return isFetchingStudent ? (
    <Loader />
  ) : (
    <AdminLayout>
      <AttendanceRecord
        user={student as User}
        data={attendances}
        isLoading={isLoading}
        onCreateAttendance={createAttendance}
        isPendingAttendance={isPendingAttendance}
        isSuccessAttendance={isCreateAttendanceSuccess}
      />
    </AdminLayout>
  );
};

export default AttendanceRecordPage;
