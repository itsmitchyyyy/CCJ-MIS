import { AdminLayout } from '@/components/Layout';
import RequestFacility from '../components/RequestFacility';
import { useFetchFacilityRequests } from '../api/fetchFacilityRequests';
import { useUpdateRequest } from '../api/updateRequest';
import { useUpdateFacility } from '../api/updateFacility';

const RequestFacilityPage = () => {
  const { data: facilityRequests = [], isLoading } = useFetchFacilityRequests();
  const { mutate: updateRequest, isPending } = useUpdateRequest();
  const {
    mutate: updateFacility,
    isPending: isPendingUpdateFacility,
    isSuccess,
  } = useUpdateFacility();

  return (
    <AdminLayout>
      <RequestFacility
        onUpdateFacility={updateFacility}
        onUpdateRequest={updateRequest}
        facilityRequests={facilityRequests}
        isFetching={isLoading}
        isPendingUpdate={isPending}
        isPendingUpdateFacility={isPendingUpdateFacility}
        isSuccessfulUpdateFacility={isSuccess}
      />
    </AdminLayout>
  );
};

export default RequestFacilityPage;
