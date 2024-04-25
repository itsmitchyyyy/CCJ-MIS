import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const fetchSetting = async () => {
  return await dependencies.settingsProvider.settingsRepository.fetchSettings();
};

const useFetchSetting = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSetting,
  });
};

export { useFetchSetting };
