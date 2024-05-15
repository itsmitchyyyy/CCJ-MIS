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
import { useDeleteDocument } from '../api/deleteDocument';
import { useEffect } from 'react';
import DocumentList from '../components/DocumentList';

const DocumentsPage = () => {
  const {
    useAuth: { id, accessType },
  } = useGlobalState();

  const {
    mutate: uploadDocuments,
    isPending,
    isSuccess,
  } = useUploadDocuments();

  const {
    data: documents = [],
    isLoading: isFetchingDocuments,
    refetch: refetchDocuments,
  } = useFetchDocuments();

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
        ? undefined
        : DocumentRequestStatus.Pending,
    user_id: accessType !== AccessType.Admin ? id : undefined,
  });

  const {
    mutate: updateDocumentRequest,
    isPending: isUpdatingDocumentRequest,
    isSuccess: isUpdateDocumentRequestSuccess,
  } = useUpdateDocumentRequest();

  const {
    mutate: deleteDocument,
    isPending: isDeletingDocument,
    isSuccess: isDeleteSuccess,
  } = useDeleteDocument();

  useEffect(() => {
    if (isDeleteSuccess) {
      refetchDocuments();
    }
  }, [isDeleteSuccess]);

  return isFetchingDocuments ? (
    <Loader />
  ) : (
    <AdminLayout>
      <DocumentList
        onDeleteDocument={deleteDocument}
        isDeletingDocument={isDeletingDocument}
        documents={documents}
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
        documentRequests={documentRequests}
        isFetchingDocumentRequests={isFetchingDocumentsRequests}
        onUpdateDocumentRequest={updateDocumentRequest}
        isUpdatingDocumentRequest={isUpdatingDocumentRequest}
        isUpdateDocumentRequestSuccess={isUpdateDocumentRequestSuccess}
        isRequestingDocumentSuccess={isRequestingDocumentSuccess}
        isRequestingDocument={isRequestingDocument}
        onAddRequestToDocument={addRequestToDocument}
      />
      {/* <Documents
        onDeleteDocument={deleteDocument}
        isDeletingDocument={isDeletingDocument}
        onUpdateDocumentRequest={updateDocumentRequest}
        isUpdatingDocumentRequest={isUpdatingDocumentRequest}
        isUpdateDocumentRequestSuccess={isUpdateDocumentRequestSuccess}
        documentRequests={documentRequests}
        isFetchingDocumentRequests={isFetchingDocumentsRequests}
        isRequestingDocumentSuccess={isRequestingDocumentSuccess}
        isRequestingDocument={isRequestingDocument}
        onAddRequestToDocument={addRequestToDocument}
        documents={documents}
        onUploadDocuments={uploadDocuments}
        isLoading={isPending}
        isSuccessful={isSuccess}
      /> */}
    </AdminLayout>
  );
};

export default DocumentsPage;
