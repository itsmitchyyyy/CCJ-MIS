import { AdminLayout } from '@/components/Layout';
import Facilities from '../components/Facilities';
import useCreateFacility from '../api/createFacility';

const FacilitiesPage = () => {
  const { mutate: createFacility, isPending, isSuccess } = useCreateFacility();

  return (
    <AdminLayout>
      <Facilities
        isCreateFacilitySuccess={isSuccess}
        isSubmitting={isPending}
        onCreateFacility={createFacility}
      />
    </AdminLayout>
  );
};

export default FacilitiesPage;
