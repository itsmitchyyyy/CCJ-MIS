import dependencies from '@/core/dependencies';
import { UpdateStudentAssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateStudentAssignment = async (params: {
  data: UpdateStudentAssignmentRequestDTO;
  id: string;
}) => {
  return await dependencies.assignmentProvider.assignmentRepository.updateStudentAssignment(
    params.data,
    params.id,
  );
};

const useUpdateStudentAssignment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateStudentAssignment'],
    mutationFn: updateStudentAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchStudentAssignments'] });
      toast.success('Score updated successfully');
    },
  });

  return mutation;
};

export { useUpdateStudentAssignment };
