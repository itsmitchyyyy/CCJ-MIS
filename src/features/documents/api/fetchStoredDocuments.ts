import dependencies from '@/core/dependencies';
import { AccessType } from '@/features/account/types';
import { useQuery } from '@tanstack/react-query';

const fetchStoredDocuments = async (
  userId?: string,
  accessType?: AccessType,
): Promise<string[]> => {
  return await dependencies.documentProvider.documentRepository.fetchStoredDocuments(
    userId,
    accessType,
  );
};

const useFetchStoredDocuments = (userId?: string, accessType?: AccessType) => {
  return useQuery({
    queryKey: ['fetchStoredDocuments', userId, accessType],
    queryFn: () => fetchStoredDocuments(userId, accessType),
  });
};

export { useFetchStoredDocuments };
