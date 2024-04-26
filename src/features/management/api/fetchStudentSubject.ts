import dependencies from '@/core/dependencies';
import {
  FetchStudentSubjectResponseDTO,
  FetchSubjectStudentQueryParams,
} from '@/core/domain/dto/subject.dto';
import { useQuery } from '@tanstack/react-query';

const fetchStudentSubject = async (
  subjectId: string,
  queryParams?: FetchSubjectStudentQueryParams,
): Promise<FetchStudentSubjectResponseDTO[]> => {
  return await dependencies.subjectProvider.subjectRepository.fetchStudentSubject(
    subjectId,
    queryParams,
  );
};

const useFetchStudentSubject = (
  subjectId: string,
  queryParams?: FetchSubjectStudentQueryParams,
) => {
  const query = useQuery({
    queryKey: ['fetchStudentSubject', subjectId, queryParams],
    queryFn: () => fetchStudentSubject(subjectId, queryParams),
  });

  return query;
};

export { useFetchStudentSubject };
