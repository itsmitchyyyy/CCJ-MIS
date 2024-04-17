import dependencies from '@/core/dependencies';
import { FacilityQuery } from '@/core/domain/dto/facility.dto';
import { useQuery } from '@tanstack/react-query';

const fetchFacilities = async (params?: FacilityQuery) => {
  return await dependencies.facilityProvider.facilityRepository.fetchFacilities(
    params,
  );
};

const useFetchFacilities = (params?: FacilityQuery) => {
  const query = useQuery({
    queryKey: ['facilities', params],
    queryFn: () => fetchFacilities(params),
  });

  return query;
};

export { useFetchFacilities };
