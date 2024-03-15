import dependencies from '@/core/dependencies';
import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const addSubject = async (data: AddSubjectRequest): Promise<void> => {
  return await dependencies.subjectProvider.subjectRepository.addSubject(data);
};

const useAddSubject = () => {
  const query = useMutation({
    mutationKey: ['addSubject'],
    onSuccess: () => {
      toast.success('Subject added');
    },
    mutationFn: addSubject,
  });

  return query;
};

export { useAddSubject };
