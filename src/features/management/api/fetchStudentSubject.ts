import dependencies from '@/core/dependencies';
import { FetchStudentSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import { useQuery } from '@tanstack/react-query';

const fetchStudentSubject = async (
  subjectId: string,
): Promise<FetchStudentSubjectResponseDTO[]> => {
  return await dependencies.subjectProvider.subjectRepository.fetchStudentSubject(
    subjectId,
  );
};

const useFetchStudentSubject = (subjectId: string) => {
  const query = useQuery({
    queryKey: ['fetchStudentSubject', subjectId],
    queryFn: () => fetchStudentSubject(subjectId),
  });

  return query;
};

export { useFetchStudentSubject };
