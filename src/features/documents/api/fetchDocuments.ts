import dependencies from '@/core/dependencies';
import {
  FetchDocumentsQuery,
  FetchDocumentsResponseDTO,
} from '@/core/domain/dto/document.dto';
import { useQuery } from '@tanstack/react-query';

const fetchDocuments = async (
  query?: FetchDocumentsQuery,
): Promise<FetchDocumentsResponseDTO[]> => {
  return await dependencies.documentProvider.documentRepository.fetchDocuments(
    query,
  );
};

const useFetchDocuments = (queryParams?: FetchDocumentsQuery) => {
  const query = useQuery({
    queryKey: ['fetchDocuments', queryParams],
    queryFn: () => fetchDocuments(queryParams),
  });

  return query;
};

export { useFetchDocuments };
