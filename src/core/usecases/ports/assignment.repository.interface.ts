import { AssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';

export default interface AssignmentRepositoryInterface {
  createAssignment(data: AssignmentRequestDTO): Promise<void>;
}
