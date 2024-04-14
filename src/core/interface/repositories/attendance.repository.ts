import urls from '@/constants/urls';
import {
  CreateAttendanceRequestDTO,
  CreateAttendanceResponseDTO,
  FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
  FetchAttendanceBySubjectIdAndStudentIdResponseDTO,
  FetchTeacherAttendanceQueryParams,
  FetchTeacherAttendanceResponseDTO,
} from '@/core/domain/dto/attendance.dto';
import AttendanceRepositoryInterface from '@/core/usecases/ports/attendance.repository.interface';

import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import dayjs from 'dayjs';

export default class AttendanceRepository
  implements AttendanceRepositoryInterface
{
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  createAttendance = async (
    data: CreateAttendanceRequestDTO,
  ): Promise<CreateAttendanceResponseDTO> => {
    const formattedData = {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    };

    return await this.httpAdapter.post(urls.attendances.base, formattedData);
  };

  fetchAttendanceBySubjectIdAndStudentId = async (
    data?: FetchAttendanceBySubjectIdAndStudentIdRequestDTO,
  ): Promise<FetchAttendanceBySubjectIdAndStudentIdResponseDTO[]> => {
    return await this.httpAdapter.get(urls.attendances.base, {
      params: {
        ...data,
      },
    });
  };

  createTeacherAttendance = async (data: CreateAttendanceRequestDTO) => {
    const formattedData = {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    };

    return await this.httpAdapter.post(urls.attendances.teacher, formattedData);
  };

  fetchTeacherAttendance = async (
    data?: FetchTeacherAttendanceQueryParams,
  ): Promise<FetchTeacherAttendanceResponseDTO[]> => {
    return await this.httpAdapter.get(urls.attendances.teacher, {
      params: {
        ...data,
      },
    });
  };
}
