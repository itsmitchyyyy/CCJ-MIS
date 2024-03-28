import dependencies from '@/core/dependencies';
import { UploadDocumentRequestDTO } from '@/core/domain/dto/document.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const uploadDocuments = async (data: UploadDocumentRequestDTO) => {
  return await dependencies.documentProvider.documentRepository.uploadDocument(
    data,
  );
};

const useUploadDocuments = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['uploadDocuments'],
    mutationFn: uploadDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchDocuments'] });
      toast.success('Document uploaded successfully');
    },
    onError: (_: any) => {
      toast.error('An error occurred while uploading document');
    },
  });

  return query;
};

export { useUploadDocuments };
