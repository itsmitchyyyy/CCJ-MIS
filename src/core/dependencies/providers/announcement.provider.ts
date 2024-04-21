import AnnouncementRepositoryInterface from '@/core/usecases/ports/announcement.repository.interface';

export interface IAnnouncementProvider {
  announcementRepository: AnnouncementRepositoryInterface;
}

const announcementProvider = ({
  announcementRepository,
}: {
  announcementRepository: AnnouncementRepositoryInterface;
}): IAnnouncementProvider => {
  return { announcementRepository };
};

export default announcementProvider;
