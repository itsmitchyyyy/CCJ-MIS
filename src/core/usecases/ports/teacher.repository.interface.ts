import {
  FetchTeacherQueryParams,
  FetchTeachersResponseDTO,
} from '@/core/domain/dto/user.dto';
import { User } from '@/core/domain/entities/user.entity';

export default interface TeacherRepositoryInterface {
  fetchTeachers(
    queryParams?: FetchTeacherQueryParams,
  ): Promise<FetchTeachersResponseDTO[]>;
  deleteTeacher(teacherId: string): Promise<void>;
  fetchTeacher(teacherId: string): Promise<User>;
}
