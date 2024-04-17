import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteFacility = async (id: number): Promise<void> => {
  return await dependencies.facilityProvider.facilityRepository.deleteFacility(
    id,
  );
};

const useDeleteFacility = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['deleteFacility'],
    mutationFn: deleteFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast.success('Facility deleted successfully');
    },
  });

  return mutation;
};

export { useDeleteFacility };
