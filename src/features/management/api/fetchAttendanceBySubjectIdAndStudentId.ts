import dependencies from '@/core/dependencies';
import { FetchAttendanceBySubjectIdAndStudentIdRequestDTO } from '@/core/domain/dto/attendance.dto';
import { useQuery } from '@tanstack/react-query';

const fetchAttendanceBySubjectIdAndStudentId = async (
  data?: FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
) => {
  return await dependencies.attendanceProvider.attendanceRepository.fetchAttendanceBySubjectIdAndStudentId(
    data,
  );
};

const useFetchAttendanceBySubjectIdAndStudentId = (
  data?: FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
) => {
  const query = useQuery({
    queryKey: ['fetchAttendanceBySubjectIdAndStudentId', data],
    queryFn: () => fetchAttendanceBySubjectIdAndStudentId(data),
  });

  return query;
};

export { useFetchAttendanceBySubjectIdAndStudentId };
