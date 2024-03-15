import dependencies from '@/core/dependencies';
import { FetchSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import { useQuery } from '@tanstack/react-query';

const fetchSubjects = async (): Promise<FetchSubjectResponseDTO[]> => {
  return await dependencies.subjectProvider.subjectRepository.fetchSubjects();
};

const useFetchSubjects = () => {
  const query = useQuery({
    queryKey: ['fetchSubjects'],
    queryFn: fetchSubjects,
  });

  return query;
};

export { useFetchSubjects };
