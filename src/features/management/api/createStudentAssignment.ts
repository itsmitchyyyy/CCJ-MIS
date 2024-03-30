import dependencies from '@/core/dependencies';
import { StudentAssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createStudentAssignment = async (data: StudentAssignmentRequestDTO) => {
  return await dependencies.assignmentProvider.assignmentRepository.createStudentAssignment(
    data,
  );
};

const useCreateStudentAssignment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createStudentAssignment'],
    mutationFn: createStudentAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkStudentAssignmentExists'],
      });
      queryClient.invalidateQueries({
        queryKey: ['fetchAssignments'],
      });
      toast.success('Assignment created successfully');
    },
  });

  return mutation;
};

export { useCreateStudentAssignment };
