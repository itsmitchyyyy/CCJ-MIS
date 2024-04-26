import urls from '@/constants/urls';
import {
  FetchStudentSubjectsQuery,
  FetchStudentsQueryParams,
  FetchStudentsResponseDTO,
} from '@/core/domain/dto/student.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import StudentRepositoryInterface from '@/core/usecases/ports/student.repository.interface';

export default class StudentRepository implements StudentRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  fetchStudents = async (
    queryParams?: FetchStudentsQueryParams,
  ): Promise<FetchStudentsResponseDTO[]> => {
    return await this.httpAdapter.get(urls.students.base, {
      params: {
        ...queryParams,
      },
    });
  };

  fetchStudent = async (id: string): Promise<FetchStudentsResponseDTO> => {
    return await this.httpAdapter.get(urls.students.get(id), {});
  };

  fetchSubjects = async (
    studentId: string,
    queryParams?: FetchStudentSubjectsQuery,
  ) => {
    return await this.httpAdapter.get(urls.students.getSubjects(studentId), {
      params: queryParams,
    });
  };
}
