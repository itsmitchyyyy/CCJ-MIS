import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteStudentFromSubject = async ({
  subjectId,
  studentId,
}: {
  subjectId: string;
  studentId: string;
}): Promise<void> => {
  return await dependencies.subjectProvider.subjectRepository.removeStudentFromSubject(
    subjectId,
    studentId,
  );
};

const useDeleteStudentFromSubject = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['removeStudentFromSubject'],
    mutationFn: deleteStudentFromSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchStudentSubject'] });
      toast.success('Student deleted from subject');
    },
  });

  return query;
};

export { useDeleteStudentFromSubject };
