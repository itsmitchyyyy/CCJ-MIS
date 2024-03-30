import dependencies from '@/core/dependencies';
import { FetchStudentAssignmentsQueryDTO } from '@/core/domain/dto/assignment.dto';
import { useQuery } from '@tanstack/react-query';

const fetchStudentAssignments = async (
  query?: FetchStudentAssignmentsQueryDTO,
) => {
  return await dependencies.assignmentProvider.assignmentRepository.fetchStudentAssignments(
    query,
  );
};

const useFetchStudentAssignments = (
  queryParams?: FetchStudentAssignmentsQueryDTO,
) => {
  const query = useQuery({
    queryKey: ['fetchStudentAssignments', queryParams],
    queryFn: () => fetchStudentAssignments(queryParams),
  });

  return query;
};

export { useFetchStudentAssignments };
