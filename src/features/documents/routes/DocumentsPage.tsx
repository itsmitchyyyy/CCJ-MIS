import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';
import { useFetchDocuments } from '../api/fetchDocuments';
import { Loader } from '@/components/Elements/Loader';
import { useAddRequestToDocument } from '../api/addRequestToDocument';
import { useFetchDocumentRequests } from '../api/fetchDocumentRequests';
import { useUpdateDocumentRequest } from '../api/updateDocumentRequest';
import { DocumentRequestStatus } from '../types';

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

  const {
    data: documentRequests = [],
    isLoading: isFetchingDocumentsRequests,
  } = useFetchDocumentRequests({ status: DocumentRequestStatus.Pending });

  const {
    mutate: updateDocumentRequest,
    isPending: isUpdatingDocumentRequest,
  } = useUpdateDocumentRequest();

  return isFetchingDocuments ? (
    <Loader />
  ) : (
    <AdminLayout>
      <Documents
        onUpdateDocumentRequest={updateDocumentRequest}
        isUpdatingDocumentRequest={isUpdatingDocumentRequest}
        documentRequests={documentRequests}
        isFetchingDocumentRequests={isFetchingDocumentsRequests}
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
