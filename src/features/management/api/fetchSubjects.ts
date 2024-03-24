import dependencies from '@/core/dependencies';
import { FetchSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { useQuery } from '@tanstack/react-query';

const fetchSubjects = async (): Promise<FetchSubjectResponseDTO[]> => {
  return await dependencies.subjectProvider.subjectRepository.fetchSubjects();
};

const useFetchSubjects = () => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const query = useQuery({
    queryKey: ['fetchSubjects'],
    queryFn: fetchSubjects,
    enabled: accessType !== AccessType.Student,
  });

  return query;
};

export { useFetchSubjects };
