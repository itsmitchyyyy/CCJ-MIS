import urls from '@/constants/urls';
import {
  AddSubjectRequest,
  FetchStudentSubjectResponseDTO,
  FetchSubjectQuery,
  FetchSubjectResponseDTO,
  UpdateGradeRequest,
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

  fetchSubjects = async (
    data?: FetchSubjectQuery,
  ): Promise<FetchSubjectResponseDTO[]> => {
    return await this.httpAdapter.get(urls.subjects.base, {
      params: data,
    });
  };

  addStudentToSubject = async (
    subjectId: string,
    studentId: string[],
  ): Promise<void> => {
    return await this.httpAdapter.post(urls.subjects.students(subjectId), {
      user_id: studentId,
    });
  };

  fetchStudentSubject = async (
    subjectId: string,
  ): Promise<FetchStudentSubjectResponseDTO[]> => {
    return await this.httpAdapter.get(urls.subjects.students(subjectId), {});
  };

  removeStudentFromSubject = async (
    subjectId: string,
    studentId: string,
  ): Promise<void> => {
    return await this.httpAdapter.delete(
      urls.subjects.deleteStudent(subjectId, studentId),
      {},
    );
  };

  updateGrade = async (data: UpdateGradeRequest): Promise<void> => {
    const { studentId, subjectId, ...params } = data;
    return await this.httpAdapter.post(
      urls.subjects.grades(subjectId, studentId),
      params,
    );
  };
}
