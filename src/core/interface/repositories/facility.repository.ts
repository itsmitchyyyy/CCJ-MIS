import urls from '@/constants/urls';
import { StoreFacilityDTO } from '@/core/domain/dto/facility.dto';
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
}
