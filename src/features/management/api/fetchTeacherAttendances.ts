import dependencies from '@/core/dependencies';
import { FetchTeacherAttendanceQueryParams } from '@/core/domain/dto/attendance.dto';
import { useQuery } from '@tanstack/react-query';

const fetchTeacherAttendances = async (
  data?: FetchTeacherAttendanceQueryParams,
) => {
  return await dependencies.attendanceProvider.attendanceRepository.fetchTeacherAttendance(
    data,
  );
};

const useFetchTeacherAttendances = (
  data?: FetchTeacherAttendanceQueryParams,
) => {
  const query = useQuery({
    queryKey: ['fetchTeacherAttendances', data],
    queryFn: () => fetchTeacherAttendances(data),
  });

  return query;
};

export { useFetchTeacherAttendances };
