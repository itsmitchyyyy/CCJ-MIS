import { AdminLayout } from '@/components/Layout';
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
import { useFetchStoredDocuments } from '../api/fetchStoredDocuments';
import { useSearchParams } from 'react-router-dom';
import { useAddNewFolder } from '../api/addNewFolder';
import { useFetchStudents } from '@/features/management/api/fetchStudents';
import { useFetchTeachers } from '@/features/management/api/fetchTeachers';

const DocumentsPage = () => {
  const {
    useAuth: { id, accessType },
  } = useGlobalState();

  const [searchParams] = useSearchParams();

  const userId =
    accessType !== AccessType.Admin
      ? id
      : searchParams.get('user_id') || undefined;

  const q = searchParams.get('q') || undefined;

  const type = searchParams.get('type') || undefined;
  const search = searchParams.get('search') || undefined;

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

  const { data: storedDocuments = [], isLoading: isFetchingStoredDocuments } =
    useFetchStoredDocuments(
      userId,
      accessType === AccessType.Admin ? accessType : undefined,
    );

  const { data: queriedDocuments = [], isLoading: isFetchingQueriedDocuments } =
    useFetchDocuments({
      user_id: userId,
      folder_type: q,
      type: accessType === AccessType.Admin ? type : undefined,
    });

  const {
    mutate: addNewFolder,
    isPending: isAddingNewFolder,
    isSuccess: isSuccessAddingNewFolder,
  } = useAddNewFolder();

  const { data: students = [], isFetching: isFetchingStudents } =
    useFetchStudents({ search: type === 'student' ? search : undefined });

  const { data: teachers = [], isFetching: isFetchingTeachers } =
    useFetchTeachers({ search: type === 'teacher' ? search : undefined });

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
        storedDocuments={storedDocuments}
        isFetchingStoredDocuments={isFetchingStoredDocuments}
        queriedDocuments={queriedDocuments}
        isFetchingQueriedDocuments={isFetchingQueriedDocuments}
        onAddNewFolder={addNewFolder}
        isAddingNewFolder={isAddingNewFolder}
        isSuccessAddingNewFolder={isSuccessAddingNewFolder}
        students={students}
        isFetchingStudents={isFetchingStudents}
        teachers={teachers}
        isFetchingTeachers={isFetchingTeachers}
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
