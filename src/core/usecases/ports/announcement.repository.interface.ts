import { StoreAnnouncementDTO } from '@/core/domain/dto/announcement.dto';

export default interface AnnouncementRepositoryInterface {
  createAnnouncement(data: StoreAnnouncementDTO): void;
}
