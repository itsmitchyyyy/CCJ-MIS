import dependencies from '@/core/dependencies';
import { UpdateDocumentRequestDTO } from '@/core/domain/dto/document.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateDocument = async (id: string, data: UpdateDocumentRequestDTO) => {
  return await dependencies.documentProvider.documentRepository.updateDocument(
    id,
    data,
  );
};

const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['updateDocument'],
    mutationFn: (data: { id: string; request: UpdateDocumentRequestDTO }) =>
      updateDocument(data.id, data.request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchDocuments'] });
      toast.success('Document updated successfully');
    },
    onError: (_: any) => {
      toast.error('An error occurred while updating document');
    },
  });

  return query;
};

export { useUpdateDocument };
