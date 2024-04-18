import { AdminLayout } from '@/components/Layout';
import RequestFacility from '../components/RequestFacility';
import { useFetchFacilityRequests } from '../api/fetchFacilityRequests';

const RequestFacilityPage = () => {
  const { data: facilityRequests = [], isLoading } = useFetchFacilityRequests();

  return (
    <AdminLayout>
      <RequestFacility
        facilityRequests={facilityRequests}
        isFetching={isLoading}
      />
    </AdminLayout>
  );
};

export default RequestFacilityPage;
