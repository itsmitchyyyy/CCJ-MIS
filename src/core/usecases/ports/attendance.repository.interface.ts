import {
  CreateAttendanceRequestDTO,
  CreateAttendanceResponseDTO,
  CreateTeacherAttendanceRequestDTO,
  FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
  FetchAttendanceBySubjectIdAndStudentIdResponseDTO,
} from '@/core/domain/dto/attendance.dto';

export default interface AttendanceRepositoryInterface {
  createAttendance(
    data: CreateAttendanceRequestDTO,
  ): Promise<CreateAttendanceResponseDTO>;
  fetchAttendanceBySubjectIdAndStudentId(
    data?: FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
  ): Promise<FetchAttendanceBySubjectIdAndStudentIdResponseDTO[]>;
  createTeacherAttendance(
    data: CreateTeacherAttendanceRequestDTO,
  ): Promise<void>;
}
