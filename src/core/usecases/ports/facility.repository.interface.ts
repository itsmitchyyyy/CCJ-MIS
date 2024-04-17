import { StoreFacilityDTO } from '@/core/domain/dto/facility.dto';

export default interface FacilityRepositoryInterface {
  createFacility(data: StoreFacilityDTO): Promise<void>;
}
