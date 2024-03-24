import dependencies from '@/core/dependencies';
import { UploadDocumentRequestDTO } from '@/core/domain/dto/document.dto';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const uploadDocuments = async (data: UploadDocumentRequestDTO) => {
  return await dependencies.documentProvider.documentRepository.uploadDocument(
    data,
  );
};

const useUploadDocuments = () => {
  const query = useMutation({
    mutationKey: ['uploadDocuments'],
    mutationFn: uploadDocuments,
    onSuccess: () => {
      toast.success('Document uploaded successfully');
    },
  });

  return query;
};

export { useUploadDocuments };
