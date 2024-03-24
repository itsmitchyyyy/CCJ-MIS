import { AdminLayout } from '@/components/Layout';
import { useParams, useSearchParams } from 'react-router-dom';
import { AttendanceRecord } from '../components/Attendance/AttendanceRecord';
import { useFetchAttendanceBySubjectIdAndStudentId } from '../api/fetchAttendanceBySubjectIdAndStudentId';
import { useFetchStudent } from '../api/fetchStudent';
import { User } from '@/core/domain/entities/user.entity';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { Loader } from '@/components/Elements/Loader';

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

  return isFetchingStudent ? (
    <Loader />
  ) : (
    <AdminLayout>
      <AttendanceRecord
        student={student as User}
        data={attendances}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
};

export default AttendanceRecordPage;
