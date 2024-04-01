import urls from '@/constants/urls';
import {
  AssignmentRequestDTO,
  FetchAssignmentRequestDTO,
  FetchAssignmentResponseDTO,
  FetchStudentAssignmentsQueryDTO,
  StudentAssignmentRequestDTO,
} from '@/core/domain/dto/assignment.dto';
import AssignmentRepositoryInterface from '@/core/usecases/ports/assignment.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import {
  StudentAssignment,
  StudentAssignments,
} from '@/features/management/types';

export default class AssignmentRepository
  implements AssignmentRepositoryInterface
{
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  createAssignment = async (data: AssignmentRequestDTO): Promise<void> => {
    return await this.httpAdapter.post(urls.assignments.base, data, {});
  };

  fetchAssignments = async (
    query?: FetchAssignmentRequestDTO,
  ): Promise<FetchAssignmentResponseDTO[]> => {
    return await this.httpAdapter.get(urls.assignments.base, { params: query });
  };

  createStudentAssignment = async (
    data: StudentAssignmentRequestDTO,
  ): Promise<void> => {
    const formData = new FormData();

    formData.append('assignment_id', data.assignment_id);
    formData.append('comments', data.comments || '');
    formData.append('user_id', data.user_id);
    data.file_paths.forEach((file) => {
      formData.append('file_paths[]', file as unknown as Blob);
    });

    return await this.httpAdapter.post(
      urls.assignments.studentAssignment,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  };

  checkStudentAssignmentExists = async (
    studentId: string,
    assignmentId: string,
  ): Promise<StudentAssignment> => {
    return await this.httpAdapter.get(
      urls.assignments.studentAssignmentExists(studentId, assignmentId),
      {},
    );
  };

  fetchStudentAssignments = async (
    query?: FetchStudentAssignmentsQueryDTO,
  ): Promise<StudentAssignments[]> => {
    return await this.httpAdapter.get(urls.assignments.studentAssignment, {
      params: query,
    });
  };

  updateStudentAssignment = async (
    data: { score: number; remarks?: string },
    id: string,
  ): Promise<StudentAssignments> => {
    return await this.httpAdapter.put(
      `${urls.assignments.studentAssignment}/${id}`,
      data,
      {},
    );
  };
}
