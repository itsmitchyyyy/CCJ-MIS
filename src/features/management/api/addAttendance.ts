import dependencies from '@/core/dependencies';
import {
  CreateAttendanceRequestDTO,
  CreateAttendanceResponseDTO,
} from '@/core/domain/dto/attendance.dto';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createAttendance = async (
  data: CreateAttendanceRequestDTO,
): Promise<CreateAttendanceResponseDTO> => {
  return await dependencies.attendanceProvider.attendanceRepository.createAttendance(
    data,
  );
};

const useCreateAttendance = () => {
  const mutation = useMutation({
    mutationKey: ['createAttendance'],
    mutationFn: createAttendance,
    onSuccess: () => {
      toast.success('Attendance created');
    },
  });

  return mutation;
};

export { useCreateAttendance };
