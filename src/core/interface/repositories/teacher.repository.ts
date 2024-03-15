import urls from '@/constants/urls';
import {
  FetchTeacherQueryParams,
  FetchTeachersResponseDTO,
} from '@/core/domain/dto/user.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import TeacherRepositoryInterface from '@/core/usecases/ports/teacher.repository.interface';

export default class TeacherRepository implements TeacherRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  fetchTeachers = async (
    queryParams?: FetchTeacherQueryParams,
  ): Promise<FetchTeachersResponseDTO[]> => {
    return await this.httpAdapter.get(urls.teachers.base, {
      params: {
        ...queryParams,
      },
    });
  };
}
