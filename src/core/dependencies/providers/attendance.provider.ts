import AttendanceRepositoryInterface from '@/core/usecases/ports/attendance.repository.interface';

export interface IAttendanceProvider {
  attendanceRepository: AttendanceRepositoryInterface;
}

const attendanceProvider = ({
  attendanceRepository,
}: {
  attendanceRepository: AttendanceRepositoryInterface;
}): IAttendanceProvider => {
  return { attendanceRepository };
};

export default attendanceProvider;
