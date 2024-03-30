import {
  AssignmentRequestDTO,
  FetchAssignmentRequestDTO,
  FetchAssignmentResponseDTO,
  StudentAssignmentRequestDTO,
} from '@/core/domain/dto/assignment.dto';

export default interface AssignmentRepositoryInterface {
  createAssignment(data: AssignmentRequestDTO): Promise<void>;
  fetchAssignments(
    query?: FetchAssignmentRequestDTO,
  ): Promise<FetchAssignmentResponseDTO[]>;
  createStudentAssignment(data: StudentAssignmentRequestDTO): Promise<void>;
}
