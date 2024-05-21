import dependencies from '@/core/dependencies';
import {
  Notification,
  NotificationQuery,
} from '@/core/domain/dto/notification.dto';
import { useQuery } from '@tanstack/react-query';

const getNotifications = async (
  query?: NotificationQuery,
): Promise<Notification[]> => {
  return dependencies.notificationProvider.notificationRepository.getNotifications(
    query,
  );
};

const useGetNotifications = (query?: NotificationQuery) => {
  return useQuery({
    queryKey: ['notifications', query],
    queryFn: () => getNotifications(query),
    enabled: query?.isEnabled,
  });
};

export { useGetNotifications };
