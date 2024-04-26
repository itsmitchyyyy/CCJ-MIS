import dependencies from '@/core/dependencies';
import {
  FetchTeacherQueryParams,
  FetchTeachersResponseDTO,
} from '@/core/domain/dto/user.dto';
import { useQuery } from '@tanstack/react-query';

const fetchTeachers = async (
  queryParams?: FetchTeacherQueryParams,
): Promise<FetchTeachersResponseDTO[]> => {
  return await dependencies.teacherProvider.teacherRepository.fetchTeachers(
    queryParams,
  );
};

const useFetchTeachers = (queryParams?: FetchTeacherQueryParams) => {
  const query = useQuery({
    queryKey: ['fetch-teachers', queryParams],
    queryFn: () => fetchTeachers(queryParams),
  });

  return query;
};

export { useFetchTeachers };
