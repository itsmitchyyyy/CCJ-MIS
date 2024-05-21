import {
  Notification,
  NotificationParams,
  NotificationQuery,
} from '@/core/domain/dto/notification.dto';

export default interface NotificationRepositoryInterface {
  getNotifications(query?: NotificationQuery): Promise<Notification[]>;
  updateNotification(id: string, params: NotificationParams): Promise<void>;
}
