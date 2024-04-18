import {
  FacilityDTO,
  FacilityQuery,
  FacilityRequestDTO,
  FetchFacilityRequestQuery,
  StoreFacilityDTO,
  StoreRequestFacilityDTO,
} from '@/core/domain/dto/facility.dto';

export default interface FacilityRepositoryInterface {
  createFacility(data: StoreFacilityDTO): Promise<void>;
  fetchFacilities(query?: FacilityQuery): Promise<FacilityDTO[]>;
  deleteFacility(id: number): Promise<void>;
  createRequest(
    facilityId: string,
    data: StoreRequestFacilityDTO,
  ): Promise<void>;
  fetchRequests(
    query?: FetchFacilityRequestQuery,
  ): Promise<FacilityRequestDTO[]>;
}
