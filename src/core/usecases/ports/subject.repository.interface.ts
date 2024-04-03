import {
  AddSubjectRequest,
  FetchStudentSubjectResponseDTO,
  FetchSubjectQuery,
  FetchSubjectResponseDTO,
} from '@/core/domain/dto/subject.dto';

export default interface SubjectRepositoryInterface {
  addSubject(data: AddSubjectRequest): Promise<void>;
  fetchSubjects(data?: FetchSubjectQuery): Promise<FetchSubjectResponseDTO[]>;
  addStudentToSubject(subjectId: string, studentId: string[]): Promise<void>;
  fetchStudentSubject(
    subjectId: string,
  ): Promise<FetchStudentSubjectResponseDTO[]>;
  removeStudentFromSubject(subjectId: string, studentId: string): Promise<void>;
}
