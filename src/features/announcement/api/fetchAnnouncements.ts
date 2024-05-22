import dependencies from '@/core/dependencies';
import { AnnouncementQuery } from '@/core/domain/dto/announcement.dto';
import { useQuery } from '@tanstack/react-query';

const fetchAnnouncements = async (query?: AnnouncementQuery) => {
  return dependencies.announcementProvider.announcementRepository.fetchAnnouncements(
    query,
  );
};

const useFetchAnnouncements = (query?: AnnouncementQuery) => {
  return useQuery({
    queryKey: ['announcements', query],
    queryFn: () => fetchAnnouncements(query),
  });
};

export { useFetchAnnouncements };
