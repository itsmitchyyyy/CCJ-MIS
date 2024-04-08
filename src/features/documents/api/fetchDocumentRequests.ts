import dependencies from '@/core/dependencies';
import { FetchDocumentRequestsQueryParams } from '@/core/domain/dto/document.dto';
import { useQuery } from '@tanstack/react-query';

const fetchDocumentRequests = async (
  query?: FetchDocumentRequestsQueryParams,
) => {
  return await dependencies.documentProvider.documentRepository.fetchDocumentRequests(
    query,
  );
};

const useFetchDocumentRequests = (
  params?: FetchDocumentRequestsQueryParams,
) => {
  const query = useQuery({
    queryKey: ['fetchDocumentRequests'],
    queryFn: () => fetchDocumentRequests(params),
  });

  return query;
};

export { useFetchDocumentRequests };
