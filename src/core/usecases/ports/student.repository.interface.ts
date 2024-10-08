import {
  FetchStudentSubjectsQuery,
  FetchStudentSubjectsResponseDTO,
  FetchStudentsQueryParams,
  FetchStudentsResponseDTO,
} from '@/core/domain/dto/student.dto';

export default interface StudentRepositoryInterface {
  fetchStudents(
    queryParams?: FetchStudentsQueryParams,
  ): Promise<FetchStudentsResponseDTO[]>;
  fetchStudent(id: string): Promise<FetchStudentsResponseDTO>;
  fetchSubjects(
    studentId: string,
    queryParams?: FetchStudentSubjectsQuery,
  ): Promise<FetchStudentSubjectsResponseDTO[]>;
}
