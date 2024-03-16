import StudentRepositoryInterface from '@/core/usecases/ports/student.repository.interface';

export interface IStudentProvider {
  studentRepository: StudentRepositoryInterface;
}

const studentProvider = ({
  studentRepository,
}: {
  studentRepository: StudentRepositoryInterface;
}): IStudentProvider => {
  return { studentRepository };
};

export default studentProvider;
