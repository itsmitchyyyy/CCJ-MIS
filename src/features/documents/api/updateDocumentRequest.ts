import dependencies from '@/core/dependencies';
import { UpdateDocumentRequestDTO } from '@/core/domain/dto/document.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const updateDocumentRequest = async (
  id: string,
  params: UpdateDocumentRequestDTO,
) => {
  return await dependencies.documentProvider.documentRepository.updateDocumentRequest(
    id,
    params,
  );
};

const useUpdateDocumentRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { id: string; params: UpdateDocumentRequestDTO }) =>
      updateDocumentRequest(data.id, data.params),
    mutationKey: ['updateDocumentRequest'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchDocumentRequests'] });
      toast.success('Document request updated successfully');
    },
  });

  return mutation;
};

export { useUpdateDocumentRequest };
