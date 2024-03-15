import urls from '@/constants/urls';
import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import SubjectRepositoryInterface from '@/core/usecases/ports/subject.repository.interface';

export default class SubjectRepository implements SubjectRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  addSubject = async (data: AddSubjectRequest): Promise<void> => {
    return await this.httpAdapter.post(urls.subjects.base, data);
  };
}
