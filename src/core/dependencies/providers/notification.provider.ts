import NotificationRepositoryInterface from '@/core/usecases/ports/notification.repository.interface';

export interface INotificationProvider {
  notificationRepository: NotificationRepositoryInterface;
}
const notificationProvider = ({
  notificationRepository,
}: {
  notificationRepository: NotificationRepositoryInterface;
}): INotificationProvider => {
  return { notificationRepository };
};

export default notificationProvider;
