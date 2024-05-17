import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const fetchStoredDocuments = async (userId?: string): Promise<string[]> => {
  return await dependencies.documentProvider.documentRepository.fetchStoredDocuments(
    userId,
  );
};

const useFetchStoredDocuments = (userId?: string) => {
  return useQuery({
    queryKey: ['fetchStoredDocuments', userId],
    queryFn: () => fetchStoredDocuments(userId),
  });
};

export { useFetchStoredDocuments };
