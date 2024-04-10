import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteTeacher = async (teacherId: string) => {
  await dependencies.teacherProvider.teacherRepository.deleteTeacher(teacherId);
};

const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-teacher'],
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-teachers'] });
      toast.success('Teacher deleted successfully');
    },
  });

  return mutation;
};

export { useDeleteTeacher };
