import { AdminLayout } from '@/components/Layout';
import Reports from '../components/Reports';
import { useFetchFacilityRequests } from '../api/fetchFacilityRequests';
import { FacilityType, RequestFacilityStatus } from '../types';

const ReportsPage = () => {
  const { data: facilityRequests = [], isLoading } = useFetchFacilityRequests({
    status: RequestFacilityStatus.Approved,
  });
  const {
    data: damagedEquipmentRequest = [],
    isLoading: isFetchingDamagedEquipments,
  } = useFetchFacilityRequests({
    type: FacilityType.Equipment,
    isDamage: true,
  });

  const { data: equipmentRequests = [], isLoading: isFetchingEquipments } =
    useFetchFacilityRequests({ type: FacilityType.Equipment });

  return (
    <AdminLayout>
      <Reports
        facilityRequests={facilityRequests}
        damagedEquipmentRequest={damagedEquipmentRequest}
        equipmentRequests={equipmentRequests}
        isFetching={isLoading}
        isFetchingEquipments={isFetchingEquipments}
        isFetchingDamagedEquipments={isFetchingDamagedEquipments}
      />
    </AdminLayout>
  );
};

export default ReportsPage;
