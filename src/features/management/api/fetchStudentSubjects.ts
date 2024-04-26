import dependencies from '@/core/dependencies';
import {
  FetchStudentSubjectsQuery,
  FetchStudentSubjectsResponseDTO,
} from '@/core/domain/dto/student.dto';
import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { useQuery } from '@tanstack/react-query';

const fetchStudentSubjects = async (
  studentId: string,
  queryParams?: FetchStudentSubjectsQuery,
): Promise<FetchStudentSubjectsResponseDTO[]> => {
  return await dependencies.studentProvider.studentRepository.fetchSubjects(
    studentId,
    queryParams,
  );
};

const useFetchStudentSubjects = (
  studentId: string,
  queryParams?: FetchStudentSubjectsQuery,
) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const query = useQuery({
    queryKey: ['fetchStudentSubjects', studentId, queryParams],
    queryFn: () => fetchStudentSubjects(studentId, queryParams),
    enabled: accessType === AccessType.Student,
    gcTime: 0,
  });

  return query;
};

export { useFetchStudentSubjects };
