import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const checkStudentAssignmentExists = async (
  studentId: string,
  assignmentId: string,
) => {
  return await dependencies.assignmentProvider.assignmentRepository.checkStudentAssignmentExists(
    studentId,
    assignmentId,
  );
};

const useCheckStudentAssignmentExists = (
  studentId: string,
  assignmentId: string,
) => {
  const query = useQuery({
    queryKey: ['checkStudentAssignmentExists', studentId, assignmentId],
    queryFn: () => checkStudentAssignmentExists(studentId, assignmentId),
  });

  return query;
};

export { useCheckStudentAssignmentExists };
