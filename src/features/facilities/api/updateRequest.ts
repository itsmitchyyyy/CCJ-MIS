import dependencies from '@/core/dependencies';
import { UpdateFacilityRequestDTO } from '@/core/domain/dto/facility.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateRequest = async (params: {
  requestId: string;
  data: UpdateFacilityRequestDTO;
}) => {
  return await dependencies.facilityProvider.facilityRepository.updateRequest(
    params.requestId,
    params.data,
  );
};

const useUpdateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFacilityRequests'] });
      toast.success('Request updated successfully');
    },
  });
};

export { useUpdateRequest };
