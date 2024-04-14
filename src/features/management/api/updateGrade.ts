import dependencies from '@/core/dependencies';
import { UpdateGradeRequest } from '@/core/domain/dto/subject.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateGrade = async (data: UpdateGradeRequest): Promise<void> => {
  return await dependencies.subjectProvider.subjectRepository.updateGrade(data);
};

const useUpdateGrade = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateGrade'],
    mutationFn: updateGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchStudentSubject'] });
      toast.success('Grade updated successfully');
    },
  });

  return mutation;
};

export { useUpdateGrade };
