import dependencies from '@/core/dependencies';
import { FetchAssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useQuery } from '@tanstack/react-query';

const fetchAssignments = async (query?: FetchAssignmentRequestDTO) => {
  return await dependencies.assignmentProvider.assignmentRepository.fetchAssignments(
    query,
  );
};

const useFetchAssignments = (queryParams?: FetchAssignmentRequestDTO) => {
  const query = useQuery({
    queryKey: ['fetchAssignments', queryParams],
    queryFn: () => fetchAssignments(queryParams),
  });

  return query;
};

export { useFetchAssignments };
