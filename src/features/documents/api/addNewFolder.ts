import dependencies from '@/core/dependencies';
import { AddNewFolderParams } from '@/core/domain/dto/document.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const addNewFolder = async (data: AddNewFolderParams) => {
  return await dependencies.documentProvider.documentRepository.addNewFolder(
    data,
  );
};

const useAddNewFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addNewFolder'],
    mutationFn: addNewFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchStoredDocuments'] });

      toast.success('New folder added successfully');
    },
  });
};

export { useAddNewFolder };
