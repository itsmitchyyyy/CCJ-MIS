import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';

const DocumentsPage = () => {
  const {
    mutate: uploadDocuments,
    isPending,
    isSuccess,
  } = useUploadDocuments();

  return (
    <AdminLayout>
      <Documents
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
      />
    </AdminLayout>
  );
};

export default DocumentsPage;
