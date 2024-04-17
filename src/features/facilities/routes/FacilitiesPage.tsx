import { AdminLayout } from '@/components/Layout';
import Facilities from '../components/Facilities';
import useCreateFacility from '../api/createFacility';
import { useFetchFacilities } from '../api/fetchFacilities';
import { useSearchParams } from 'react-router-dom';
import { FacilityStatus, FacilityType } from '../types';
import { useDeleteFacility } from '../api/deleteFacility';

const FacilitiesPage = () => {
  const [searchParams, _] = useSearchParams();

  const status = searchParams.get('status') as FacilityStatus;
  const type =
    (searchParams.get('type') as FacilityType) || FacilityType.Regular;

  const { mutate: createFacility, isPending, isSuccess } = useCreateFacility();
  const { data: facilities = [], isLoading } = useFetchFacilities({
    status,
    type,
  });
  const { mutate: deleteFacility, isPending: isDeleting } = useDeleteFacility();

  return (
    <AdminLayout>
      <Facilities
        facilities={facilities}
        isFetching={isLoading}
        isCreateFacilitySuccess={isSuccess}
        isSubmitting={isPending}
        isDeleting={isDeleting}
        onCreateFacility={createFacility}
        onDeleteFacility={deleteFacility}
      />
    </AdminLayout>
  );
};

export default FacilitiesPage;
