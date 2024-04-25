import dependencies from '@/core/dependencies';
import { SettingRequest } from '@/core/domain/dto/settings.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const createSettings = async (settings: SettingRequest) => {
  return await dependencies.settingsProvider.settingsRepository.createSettings(
    settings,
  );
};

const useCreateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings created successfully');
    },
  });
};

export { useCreateSettings };
