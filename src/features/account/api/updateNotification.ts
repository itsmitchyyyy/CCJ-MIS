import dependencies from '@/core/dependencies';
import { NotificationParams } from '@/core/domain/dto/notification.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateNotification = async ({
  notificationId,
  params,
}: {
  notificationId: string;
  params: NotificationParams;
}) => {
  return await dependencies.notificationProvider.notificationRepository.updateNotification(
    notificationId,
    params,
  );
};

const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export { useUpdateNotification };
