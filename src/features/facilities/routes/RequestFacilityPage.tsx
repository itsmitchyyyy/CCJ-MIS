import { AdminLayout } from '@/components/Layout';
import RequestFacility from '../components/RequestFacility';
import { useFetchFacilityRequests } from '../api/fetchFacilityRequests';
import { useUpdateRequest } from '../api/updateRequest';

const RequestFacilityPage = () => {
  const { data: facilityRequests = [], isLoading } = useFetchFacilityRequests();
  const { mutate: updateRequest, isPending } = useUpdateRequest();

  return (
    <AdminLayout>
      <RequestFacility
        onUpdateRequest={updateRequest}
        facilityRequests={facilityRequests}
        isFetching={isLoading}
        isPendingUpdate={isPending}
      />
    </AdminLayout>
  );
};

export default RequestFacilityPage;
