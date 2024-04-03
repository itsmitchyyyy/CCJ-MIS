import dependencies from '@/core/dependencies';
import { AddRequestToDocumentDTO } from '@/core/domain/dto/document.dto';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const addRequestToDocument = async (data: AddRequestToDocumentDTO) => {
  return await dependencies.documentProvider.documentRepository.addRequestToDocument(
    data,
  );
};

const useAddRequestToDocument = () => {
  const mutation = useMutation({
    mutationFn: addRequestToDocument,
    mutationKey: ['addRequestToDocument'],
    onSuccess: () => {
      toast.success('Request added successfully');
    },
  });

  return mutation;
};

export { useAddRequestToDocument };
