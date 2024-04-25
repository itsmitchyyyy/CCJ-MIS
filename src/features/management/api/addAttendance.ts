import dependencies from '@/core/dependencies';
import {
  CreateAttendanceRequestDTO,
  CreateAttendanceResponseDTO,
} from '@/core/domain/dto/attendance.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createAttendance = async (
  data: CreateAttendanceRequestDTO,
): Promise<CreateAttendanceResponseDTO> => {
  return await dependencies.attendanceProvider.attendanceRepository.createAttendance(
    data,
  );
};

const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createAttendance'],
    mutationFn: createAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchAttendanceBySubjectIdAndStudentId'],
      });
      toast.success('Attendance created');
    },
  });

  return mutation;
};

export { useCreateAttendance };
