import dependencies from '@/core/dependencies';
import { FetchDocumentsResponseDTO } from '@/core/domain/dto/document.dto';
import { useQuery } from '@tanstack/react-query';

const fetchDocuments = async (): Promise<FetchDocumentsResponseDTO[]> => {
  return await dependencies.documentProvider.documentRepository.fetchDocuments();
};

const useFetchDocuments = () => {
  const query = useQuery({
    queryKey: ['fetchDocuments'],
    queryFn: fetchDocuments,
  });

  return query;
};

export { useFetchDocuments };
