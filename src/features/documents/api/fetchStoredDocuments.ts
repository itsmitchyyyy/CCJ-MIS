import dependencies from '@/core/dependencies';
import { useQuery } from '@tanstack/react-query';

const fetchStoredDocuments = async (): Promise<string[]> => {
  return await dependencies.documentProvider.documentRepository.fetchStoredDocuments();
};

const useFetchStoredDocuments = () => {
  return useQuery({
    queryKey: ['fetchStoredDocuments'],
    queryFn: fetchStoredDocuments,
  });
};

export { useFetchStoredDocuments };
