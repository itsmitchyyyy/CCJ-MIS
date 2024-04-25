import urls from '@/constants/urls';
import { Setting, SettingRequest } from '@/core/domain/dto/settings.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import SettingsRepositoryInterface from '@/core/usecases/ports/settings.repository.interface';

export default class SettingsRepository implements SettingsRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  fetchSettings = async (): Promise<Setting> => {
    return await this.httpAdapter.get(urls.settings.base, {});
  };

  createSettings = async (params: SettingRequest): Promise<void> => {
    return await this.httpAdapter.post(urls.settings.base, params);
  };
}
