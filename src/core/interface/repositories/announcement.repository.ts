import urls from '@/constants/urls';
import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';
import AnnouncementRepositoryInterface from '@/core/usecases/ports/announcement.repository.interface';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import { Announcement } from '@/features/announcement/types';

export default class AnnouncementRepository
  implements AnnouncementRepositoryInterface
{
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  createAnnouncement = async (data: StoreAnnouncementDTO): Promise<void> => {
    const formData = new FormData();

    if (data.status) {
      formData.append('status', data.status);
    }

    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images[]', image as unknown as Blob);
      });
    }

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('posted_by_id', data.posted_by_id);

    return await this.httpAdapter.post(urls.announcements.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  fetchAnnouncements = async (): Promise<Announcement[]> => {
    return await this.httpAdapter.get(urls.announcements.base, {});
  };

  deleteAnnouncement = async (id: string): Promise<void> => {
    return await this.httpAdapter.delete(
      `${urls.announcements.base}/${id}`,
      {},
    );
  };
}
