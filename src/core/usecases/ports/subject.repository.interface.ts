import {
  AddSubjectRequest,
  FetchStudentSubjectResponseDTO,
  FetchSubjectResponseDTO,
} from '@/core/domain/dto/subject.dto';

export default interface SubjectRepositoryInterface {
  addSubject(data: AddSubjectRequest): Promise<void>;
  fetchSubjects(): Promise<FetchSubjectResponseDTO[]>;
  addStudentToSubject(subjectId: string, studentId: string[]): Promise<void>;
  fetchStudentSubject(
    subjectId: string,
  ): Promise<FetchStudentSubjectResponseDTO[]>;
}
