import urls from '@/constants/urls';
import {
  FacilityDTO,
  FacilityQuery,
  FacilityRequestDTO,
  FetchFacilityRequestQuery,
  StoreFacilityDTO,
  StoreRequestFacilityDTO,
  UpdateFacilityRequestDTO,
} from '@/core/domain/dto/facility.dto';
import FacilityRepositoryInterface from '@/core/usecases/ports/facility.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';

export default class FacilityRepository implements FacilityRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  createFacility = async (data: StoreFacilityDTO): Promise<void> => {
    await this.httpAdapter.post(urls.facilities.base, data);
  };

  fetchFacilities = async (query?: FacilityQuery): Promise<FacilityDTO[]> => {
    return await this.httpAdapter.get(urls.facilities.base, {
      params: query,
    });
  };

  deleteFacility = async (id: number): Promise<void> => {
    await this.httpAdapter.delete(`${urls.facilities.base}/${id}`, {});
  };

  createRequest = async (
    facilityId: string,
    data: StoreRequestFacilityDTO,
  ): Promise<void> => {
    await this.httpAdapter.post(
      `${urls.facilities.requests}/${facilityId}`,
      data,
    );
  };

  fetchRequests = async (
    query?: FetchFacilityRequestQuery,
  ): Promise<FacilityRequestDTO[]> => {
    return await this.httpAdapter.get(urls.facilities.requests, {
      params: query,
    });
  };

  updateRequest = async (
    id: string,
    data: UpdateFacilityRequestDTO,
  ): Promise<void> => {
    await this.httpAdapter.put(`${urls.facilities.requests}/${id}`, data);
  };
}
