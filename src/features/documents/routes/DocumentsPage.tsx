import { AdminLayout } from '@/components/Layout';
import Documents from '../components/Documents';
import { useUploadDocuments } from '../api/uploadDocuments';
import { useFetchDocuments } from '../api/fetchDocuments';
import { Loader } from '@/components/Elements/Loader';
import { useAddRequestToDocument } from '../api/addRequestToDocument';
import { useFetchDocumentRequests } from '../api/fetchDocumentRequests';
import { useUpdateDocumentRequest } from '../api/updateDocumentRequest';
import { DocumentRequestStatus } from '../types';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';

const DocumentsPage = () => {
  const {
    useAuth: { id, accessType },
  } = useGlobalState();

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
  } = useFetchDocumentRequests({
    status:
      accessType !== AccessType.Admin
        ? DocumentRequestStatus.Approved
        : DocumentRequestStatus.Pending,
    user_id: accessType !== AccessType.Admin ? id : undefined,
  });

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
