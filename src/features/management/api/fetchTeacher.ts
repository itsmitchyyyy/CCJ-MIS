import dependencies from '@/core/dependencies';
import { User } from '@/core/domain/entities/user.entity';
import { useQuery } from '@tanstack/react-query';

const fetchTeacher = async (teacherId: string): Promise<User> => {
  return await dependencies.teacherProvider.teacherRepository.fetchTeacher(
    teacherId,
  );
};

const useFetchTeacher = (teacherId: string) => {
  const query = useQuery({
    queryKey: ['fetch-teacher', teacherId],
    queryFn: () => fetchTeacher(teacherId),
  });

  return query;
};

export { useFetchTeacher };
