import {
  FetchTeacherQueryParams,
  FetchTeachersResponseDTO,
} from '@/core/domain/dto/user.dto';

export default interface TeacherRepositoryInterface {
  fetchTeachers(
    queryParams?: FetchTeacherQueryParams,
  ): Promise<FetchTeachersResponseDTO[]>;
  deleteTeacher(teacherId: string): Promise<void>;
}
