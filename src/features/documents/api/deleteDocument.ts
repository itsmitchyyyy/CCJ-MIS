import dependencies from '@/core/dependencies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const deleteDocument = async (id: string): Promise<void> => {
  return await dependencies.documentProvider.documentRepository.deleeteDocument(
    id,
  );
};

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    mutationKey: ['deleteDocument'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchDocuments'] });
      toast.success('Document deleted successfully');
    },
  });
};

export { useDeleteDocument };
