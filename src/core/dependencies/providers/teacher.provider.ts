import TeacherRepositoryInterface from '@/core/usecases/ports/teacher.repository.interface';

export interface ITeacherProvider {
  teacherRepository: TeacherRepositoryInterface;
}

const teacherProvider = ({
  teacherRepository,
}: {
  teacherRepository: TeacherRepositoryInterface;
}): ITeacherProvider => {
  return { teacherRepository };
};

export default teacherProvider;
