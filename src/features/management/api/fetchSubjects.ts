import dependencies from '@/core/dependencies';
import {
  FetchSubjectQuery,
  FetchSubjectResponseDTO,
} from '@/core/domain/dto/subject.dto';
import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { useQuery } from '@tanstack/react-query';

const fetchSubjects = async (
  data?: FetchSubjectQuery,
): Promise<FetchSubjectResponseDTO[]> => {
  return await dependencies.subjectProvider.subjectRepository.fetchSubjects(
    data,
  );
};

const useFetchSubjects = (data?: FetchSubjectQuery) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const query = useQuery({
    queryKey: ['fetchSubjects', data],
    queryFn: () => fetchSubjects(data),
    enabled: accessType !== AccessType.Student,
  });

  return query;
};

export { useFetchSubjects };
