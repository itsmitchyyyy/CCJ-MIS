import AssignmentRepositoryInterface from '@/core/usecases/ports/assignment.repository.interface';

export interface IAssignmentProvider {
  assignmentRepository: AssignmentRepositoryInterface;
}

const assignmentProvider = ({
  assignmentRepository,
}: {
  assignmentRepository: AssignmentRepositoryInterface;
}): IAssignmentProvider => {
  return { assignmentRepository };
};

export default assignmentProvider;
