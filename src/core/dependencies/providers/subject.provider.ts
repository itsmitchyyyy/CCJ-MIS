import SubjectRepositoryInterface from '@/core/usecases/ports/subject.repository.interface';

export interface ISubjectProvider {
  subjectRepository: SubjectRepositoryInterface;
}

const subjectProvider = ({
  subjectRepository,
}: {
  subjectRepository: SubjectRepositoryInterface;
}): ISubjectProvider => {
  return { subjectRepository };
};

export default subjectProvider;
