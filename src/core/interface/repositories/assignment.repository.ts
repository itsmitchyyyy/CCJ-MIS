import urls from '@/constants/urls';
import {
  AssignmentRequestDTO,
  FetchAssignmentRequestDTO,
  FetchAssignmentResponseDTO,
} from '@/core/domain/dto/assignment.dto';
import AssignmentRepositoryInterface from '@/core/usecases/ports/assignment.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';

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
}
