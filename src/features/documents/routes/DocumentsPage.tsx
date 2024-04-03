import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';
import { useFetchDocuments } from '../api/fetchDocuments';
import { Loader } from '@/components/Elements/Loader';
import { useAddRequestToDocument } from '../api/addRequestToDocument';

const DocumentsPage = () => {
  const {
    mutate: uploadDocuments,
    isPending,
    isSuccess,
  } = useUploadDocuments();

  const { data: documents = [], isLoading: isFetchingDocuments } =
    useFetchDocuments();

  const {
    mutate: addRequestToDocument,
    isPending: isRequestingDocument,
    isSuccess: isRequestingDocumentSuccess,
  } = useAddRequestToDocument();

  return isFetchingDocuments ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Documents
        isRequestingDocumentSuccess={isRequestingDocumentSuccess}
        isRequestingDocument={isRequestingDocument}
        onAddRequestToDocument={addRequestToDocument}
        documents={documents}
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
      />
    </AdminLayout>
  );
};

export default DocumentsPage;
