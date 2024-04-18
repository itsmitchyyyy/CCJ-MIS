import dependencies from '@/core/dependencies';
import { FetchFacilityRequestQuery } from '@/core/domain/dto/facility.dto';
import { useQuery } from '@tanstack/react-query';

const fetchFetchFacilityRequests = async (
  query?: FetchFacilityRequestQuery,
) => {
  return await dependencies.facilityProvider.facilityRepository.fetchRequests(
    query,
  );
};

const useFetchFacilityRequests = (params?: FetchFacilityRequestQuery) =>
  useQuery({
    queryKey: ['fetchFacilityRequests', params],
    queryFn: () => fetchFetchFacilityRequests(params),
  });

export { useFetchFacilityRequests };
