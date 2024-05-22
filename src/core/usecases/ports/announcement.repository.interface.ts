import {
  AnnouncementQuery,
  StoreAnnouncementDTO,
} from '@/core/domain/dto/announcement.dto';
import { Announcement } from '@/features/announcement/types';

export default interface AnnouncementRepositoryInterface {
  createAnnouncement(data: StoreAnnouncementDTO): void;
  fetchAnnouncements(query?: AnnouncementQuery): Promise<Announcement[]>;
  deleteAnnouncement(id: string): void;
}
