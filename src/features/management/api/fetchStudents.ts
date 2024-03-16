import dependencies from '@/core/dependencies';
import {
  FetchStudentsQueryParams,
  FetchStudentsResponseDTO,
} from '@/core/domain/dto/student.dto';

import { useQuery } from '@tanstack/react-query';

const fetchStudents = async (
  queryParams?: FetchStudentsQueryParams,
): Promise<FetchStudentsResponseDTO[]> => {
  return await dependencies.studentProvider.studentRepository.fetchStudents(
    queryParams,
  );
};

const useFetchStudents = (queryParams?: FetchStudentsQueryParams) => {
  const query = useQuery({
    queryKey: ['fetch-students'],
    queryFn: () => fetchStudents(queryParams),
  });

  return query;
};

export { useFetchStudents };
