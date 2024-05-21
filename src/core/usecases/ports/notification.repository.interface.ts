import {
  Notification,
  NotificationQuery,
} from '@/core/domain/dto/notification.dto';

export default interface NotificationRepositoryInterface {
  getNotifications(query?: NotificationQuery): Promise<Notification[]>;
}
