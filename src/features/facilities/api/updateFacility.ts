import dependencies from '@/core/dependencies';
import { UpdateFacilityQuery } from '@/core/domain/dto/facility.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateFacility = async (data: {
  id: number;
  query: UpdateFacilityQuery;
}) => {
  return await dependencies.facilityProvider.facilityRepository.updateFacility(
    data.id,
    data.query,
  );
};

const useUpdateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateFacility'],
    mutationFn: updateFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      queryClient.invalidateQueries({ queryKey: ['fetchFacilityRequests'] });
      toast.success('Facility updated successfully');
    },
  });
};

export { useUpdateFacility };
