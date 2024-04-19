import { AdminLayout } from '@/components/Layout';
import Facilities from '../components/Facilities';
import useCreateFacility from '../api/createFacility';
import { useFetchFacilities } from '../api/fetchFacilities';
import { useSearchParams } from 'react-router-dom';
import { FacilityStatus, FacilityType } from '../types';
import { useDeleteFacility } from '../api/deleteFacility';
import { useCreateRequest } from '../api/createRequest';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { useUpdateRequest } from '../api/updateRequest';

const FacilitiesPage = () => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const [searchParams, _] = useSearchParams();

  const status = searchParams.get('status') as FacilityStatus;
  const type =
    (searchParams.get('type') as FacilityType) || FacilityType.Regular;
  const user_id =
    accessType === AccessType.Teacher && type === FacilityType.MyRequest
      ? id
      : undefined;

  const { mutate: createFacility, isPending, isSuccess } = useCreateFacility();
  const { data: facilities = [], isLoading } = useFetchFacilities({
    status,
    type,
    user_id,
  });
  const { mutate: deleteFacility, isPending: isDeleting } = useDeleteFacility();
  const {
    mutate: createRequest,
    isPending: isCreatingRequest,
    isSuccess: isRequestSuccess,
  } = useCreateRequest();

  const { mutate: updateRequest, isPending: isPendingUpdate } =
    useUpdateRequest();

  return (
    <AdminLayout>
      <Facilities
        facilities={facilities}
        isFetching={isLoading}
        isCreateFacilitySuccess={isSuccess}
        isSubmitting={isPending}
        isDeleting={isDeleting}
        isRequesting={isCreatingRequest}
        isRequestSuccess={isRequestSuccess}
        isPendingUpdate={isPendingUpdate}
        onCreateFacility={createFacility}
        onDeleteFacility={deleteFacility}
        onRequestFacility={createRequest}
        onUpdateRequest={updateRequest}
      />
    </AdminLayout>
  );
};

export default FacilitiesPage;
