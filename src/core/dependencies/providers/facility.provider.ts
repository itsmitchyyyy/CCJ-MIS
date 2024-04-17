import FacilityRepositoryInterface from '@/core/usecases/ports/facility.repository.interface';

export interface IFacilityProvider {
  facilityRepository: FacilityRepositoryInterface;
}

const facilityProvider = ({
  facilityRepository,
}: {
  facilityRepository: FacilityRepositoryInterface;
}): IFacilityProvider => {
  return { facilityRepository };
};

export default facilityProvider;
