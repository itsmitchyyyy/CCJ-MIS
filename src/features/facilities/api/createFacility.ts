import dependencies from '@/core/dependencies';
import { StoreFacilityDTO } from '@/core/domain/dto/facility.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createFacility = async (data: StoreFacilityDTO) => {
  return await dependencies.facilityProvider.facilityRepository.createFacility(
    data,
  );
};

const useCreateFacility = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast.success('Facility created successfully');
    },
  });

  return mutation;
};

export default useCreateFacility;
