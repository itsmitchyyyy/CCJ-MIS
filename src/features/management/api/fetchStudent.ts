import dependencies from '@/core/dependencies';
import { FetchStudentsResponseDTO } from '@/core/domain/dto/student.dto';
import { useQuery } from '@tanstack/react-query';

const fetchStudent = async (id: string): Promise<FetchStudentsResponseDTO> => {
  return await dependencies.studentProvider.studentRepository.fetchStudent(id);
};

const useFetchStudent = (id: string) => {
  const query = useQuery({
    queryKey: ['fetch-student', id],
    queryFn: () => fetchStudent(id),
  });

  return query;
};

export { useFetchStudent };
