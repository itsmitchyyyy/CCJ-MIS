import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const fetchAnnouncements = async () => {
  return dependencies.announcementProvider.announcementRepository.fetchAnnouncements();
};

const useFetchAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });
};

export { useFetchAnnouncements };
