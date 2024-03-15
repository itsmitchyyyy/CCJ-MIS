import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';

export default interface SubjectRepositoryInterface {
  addSubject(data: AddSubjectRequest): Promise<void>;
}
