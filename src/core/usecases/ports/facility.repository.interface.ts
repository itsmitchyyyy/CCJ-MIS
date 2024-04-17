import {
  FacilityDTO,
  FacilityQuery,
  StoreFacilityDTO,
} from '@/core/domain/dto/facility.dto';

export default interface FacilityRepositoryInterface {
  createFacility(data: StoreFacilityDTO): Promise<void>;
  fetchFacilities(query?: FacilityQuery): Promise<FacilityDTO[]>;
  deleteFacility(id: number): Promise<void>;
}
