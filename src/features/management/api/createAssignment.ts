import dependencies from '@/core/dependencies';
import { AssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createAssignment = async (data: AssignmentRequestDTO): Promise<void> => {
  return await dependencies.assignmentProvider.assignmentRepository.createAssignment(
    data,
  );
};

const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['createAssignment'],
    mutationFn: createAssignment,
    onSuccess: () => {
      toast.success('Assignment created successfully');
      queryClient.invalidateQueries({ queryKey: ['fetchAssignments'] });
    },
  });

  return query;
};

export { useCreateAssignment };
