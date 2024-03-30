import {
  AssignmentRequestDTO,
  FetchAssignmentRequestDTO,
  FetchAssignmentResponseDTO,
  FetchStudentAssignmentsQueryDTO,
  StudentAssignmentRequestDTO,
} from '@/core/domain/dto/assignment.dto';
import {
  StudentAssignment,
  StudentAssignments,
} from '@/features/management/types';

export default interface AssignmentRepositoryInterface {
  createAssignment(data: AssignmentRequestDTO): Promise<void>;
  fetchAssignments(
    query?: FetchAssignmentRequestDTO,
  ): Promise<FetchAssignmentResponseDTO[]>;
  createStudentAssignment(data: StudentAssignmentRequestDTO): Promise<void>;
  checkStudentAssignmentExists(
    studentId: string,
    assignmentId: string,
  ): Promise<StudentAssignment>;
  fetchStudentAssignments(
    query?: FetchStudentAssignmentsQueryDTO,
  ): Promise<StudentAssignments[]>;
}
