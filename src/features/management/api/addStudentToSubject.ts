import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AddStudentToSubjectRequest } from '../types';

const addStudentToSubject = async ({
  subjectId,
  studentId,
}: AddStudentToSubjectRequest): Promise<void> => {
  return await dependencies.subjectProvider.subjectRepository.addStudentToSubject(
    subjectId,
    studentId,
  );
};

const useAddStudentToSubject = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['addStudentToSubject'],
    mutationFn: addStudentToSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchStudentSubject'] });
      toast.success('Student added to subject');
    },
  });

  return query;
};

export { useAddStudentToSubject };
