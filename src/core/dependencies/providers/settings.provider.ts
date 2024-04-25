import SettingsRepositoryInterface from '@/core/usecases/ports/settings.repository.interface';

export interface ISettingsProvider {
  settingsRepository: SettingsRepositoryInterface;
}

const settingsProvider = ({
  settingsRepository,
}: {
  settingsRepository: SettingsRepositoryInterface;
}): ISettingsProvider => {
  return { settingsRepository };
};

export default settingsProvider;
