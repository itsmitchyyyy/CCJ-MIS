import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';
import { Announcement } from '@/features/announcement/types';

export default interface AnnouncementRepositoryInterface {
  createAnnouncement(data: StoreAnnouncementDTO): void;
  fetchAnnouncements(): Promise<Announcement[]>;
  deleteAnnouncement(id: string): void;
}
