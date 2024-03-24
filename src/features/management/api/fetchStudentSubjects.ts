import dependencies from '@/core/dependencies';
import { FetchStudentSubjectsResponseDTO } from '@/core/domain/dto/student.dto';
import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { useQuery } from '@tanstack/react-query';

const fetchStudentSubjects = async (
  studentId: string,
): Promise<FetchStudentSubjectsResponseDTO[]> => {
  return await dependencies.studentProvider.studentRepository.fetchSubjects(
    studentId,
  );
};

const useFetchStudentSubjects = (studentId: string) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const query = useQuery({
    queryKey: ['fetchStudentSubjects', studentId],
    queryFn: () => fetchStudentSubjects(studentId),
    enabled: accessType === AccessType.Student,
  });

  return query;
};

export { useFetchStudentSubjects };
