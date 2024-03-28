import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';
import { useFetchDocuments } from '../api/fetchDocuments';
import { Loader } from '@/components/Elements/Loader';
import { useUpdateDocument } from '../api/updateDocument';

const DocumentsPage = () => {
  const {
    mutate: uploadDocuments,
    isPending,
    isSuccess,
  } = useUploadDocuments();

  const { data: documents = [], isLoading: isFetchingDocuments } =
    useFetchDocuments();

  const { mutate: updateDocument, isPending: isUpdatingDocument } =
    useUpdateDocument();

  return isFetchingDocuments ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Documents
        isUpdatingDocument={isUpdatingDocument}
        onUpdateDocument={updateDocument}
        documents={documents}
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
      />
    </AdminLayout>
  );
};

export default DocumentsPage;
