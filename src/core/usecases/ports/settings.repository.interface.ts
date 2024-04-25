import { Setting, SettingRequest } from '@/core/domain/dto/settings.dto';

export default interface SettingsRepositoryInterface {
  createSettings(params: SettingRequest): Promise<void>;
  fetchSettings(): Promise<Setting>;
}
