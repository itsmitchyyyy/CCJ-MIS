import { AdminLayout } from '@/components/Layout';
import ProfileAttendanceRecords from '../components/ProfileAttendanceRecords';
import { useFetchTeacherAttendances } from '@/features/management/api/fetchTeacherAttendances';
import { useGlobalState } from '@/hooks/global';
import { useSearchParams } from 'react-router-dom';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';

const ProfileAttendanceRecordsPage = () => {
  const {
    useAuth: { id },
  } = useGlobalState();
  const [searchParams] = useSearchParams();

  const { data: attendances = [], isLoading } = useFetchTeacherAttendances({
    user_id: id,
    status: (searchParams.get('status') as AttendanceStatus) || undefined,
    date: searchParams.get('date') || undefined,
  });

  return (
    <AdminLayout>
      <ProfileAttendanceRecords data={attendances} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default ProfileAttendanceRecordsPage;
