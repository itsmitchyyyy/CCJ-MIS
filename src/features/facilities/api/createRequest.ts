import dependencies from '@/core/dependencies';
import { StoreRequestFacilityDTO } from '@/core/domain/dto/facility.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createRequest = async (
  data: StoreRequestFacilityDTO & { facility_id: string },
) => {
  const { facility_id, ...rest } = data;
  return await dependencies.facilityProvider.facilityRepository.createRequest(
    facility_id,
    rest,
  );
};

const useCreateRequest = () => {
  const queryCLient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createRequest'],
    mutationFn: createRequest,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ['facility_requests'] });
      toast.success('Request created successfully');
    },
  });

  return mutation;
};

export { useCreateRequest };
