import {
  FacilityDTO,
  FacilityQuery,
  FacilityRequestDTO,
  FetchFacilityRequestQuery,
  StoreFacilityDTO,
  StoreRequestFacilityDTO,
  UpdateFacilityQuery,
  UpdateFacilityRequestDTO,
} from '@/core/domain/dto/facility.dto';

export default interface FacilityRepositoryInterface {
  createFacility(data: StoreFacilityDTO): Promise<void>;
  fetchFacilities(
    query?: FacilityQuery,
  ): Promise<FacilityDTO[] | FacilityRequestDTO[]>;
  deleteFacility(id: number): Promise<void>;
  updateFacility(id: number, query: UpdateFacilityQuery): Promise<void>;
  createRequest(
    facilityId: string,
    data: StoreRequestFacilityDTO,
  ): Promise<void>;
  fetchRequests(
    query?: FetchFacilityRequestQuery,
  ): Promise<FacilityRequestDTO[]>;
  updateRequest(id: string, data: UpdateFacilityRequestDTO): Promise<void>;
}
