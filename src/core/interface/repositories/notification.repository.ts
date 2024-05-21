import urls from '@/constants/urls';
import {
  Notification,
  NotificationParams,
  NotificationQuery,
} from '@/core/domain/dto/notification.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import NotificationRepositoryInterface from '@/core/usecases/ports/notification.repository.interface';

export default class NotificationRepository
  implements NotificationRepositoryInterface
{
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  getNotifications = async (
    query?: NotificationQuery,
  ): Promise<Notification[]> => {
    const { isEnabled, ...rest } = query as NotificationQuery;

    return await this.httpAdapter.get(urls.notifications.base, {
      params: rest,
    });
  };

  updateNotification = async (
    id: string,
    params: NotificationParams,
  ): Promise<void> => {
    await this.httpAdapter.put(`${urls.notifications.base}/${id}`, params);
  };
}
