import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';
import { useFetchDocuments } from '../api/fetchDocuments';
import { Loader } from '@/components/Elements/Loader';

const DocumentsPage = () => {
  const {
    mutate: uploadDocuments,
    isPending,
    isSuccess,
  } = useUploadDocuments();

  const { data: documents = [], isLoading: isFetchingDocuments } =
    useFetchDocuments();

  return isFetchingDocuments ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Documents
        documents={documents}
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
      />
    </AdminLayout>
  );
};

export default DocumentsPage;
