import urls from '@/constants/urls';
import {
  AddSubjectRequest,
  FetchSubjectResponseDTO,
} from '@/core/domain/dto/subject.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import SubjectRepositoryInterface from '@/core/usecases/ports/subject.repository.interface';
import moment from 'moment';

export default class SubjectRepository implements SubjectRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  addSubject = async (data: AddSubjectRequest): Promise<void> => {
    const { time_start, time_end, ...rest } = data;
    const formattedData = {
      ...rest,
      time_start: moment(time_start).format('HH:mm'),
      time_end: moment(time_end).format('HH:mm'),
    };
    return await this.httpAdapter.post(urls.subjects.base, formattedData);
  };

  fetchSubjects = async (): Promise<FetchSubjectResponseDTO[]> => {
    return await this.httpAdapter.get(urls.subjects.base, {});
  };

  addStudentToSubject = async (
    subjectId: string,
    studentId: string,
  ): Promise<void> => {
    return await this.httpAdapter.post(urls.subjects.students(subjectId), {
      studentId,
    });
  };
}
