import dependencies from '@/core/dependencies';
import { CreateTeacherAttendanceRequestDTO } from '@/core/domain/dto/attendance.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createTeacherAttendance = async (
  data: CreateTeacherAttendanceRequestDTO,
): Promise<void> => {
  return await dependencies.attendanceProvider.attendanceRepository.createTeacherAttendance(
    data,
  );
};

const useCreateTeacherAttendance = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createTeacherAttendance'],
    mutationFn: createTeacherAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchTeacherAttendances'] });
      toast.success('Attendance created');
    },
  });

  return mutation;
};

export { useCreateTeacherAttendance };
