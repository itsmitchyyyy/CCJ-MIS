import {
  AddSubjectRequest,
  FetchStudentSubjectResponseDTO,
  FetchSubjectQuery,
  FetchSubjectResponseDTO,
  FetchSubjectStudentQueryParams,
  UpdateGradeRequest,
} from '@/core/domain/dto/subject.dto';

export default interface SubjectRepositoryInterface {
  addSubject(data: AddSubjectRequest): Promise<void>;
  fetchSubjects(data?: FetchSubjectQuery): Promise<FetchSubjectResponseDTO[]>;
  addStudentToSubject(subjectId: string, studentId: string[]): Promise<void>;
  fetchStudentSubject(
    subjectId: string,
    queryParams?: FetchSubjectStudentQueryParams,
  ): Promise<FetchStudentSubjectResponseDTO[]>;
  removeStudentFromSubject(subjectId: string, studentId: string): Promise<void>;
  updateGrade(data: UpdateGradeRequest): Promise<void>;
}
