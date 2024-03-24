import { AdminLayout } from '@/components/Layout';
import ManagementList from '../components/ManagementList/ManagementList';
import { useFetchSubjects } from '../api/fetchSubjects';
import { useEffect, useState } from 'react';
import { useFetchStudentSubjects } from '../api/fetchStudentSubjects';
import { useGlobalState } from '@/hooks/global';
import { FetchSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import { AccessType } from '@/features/account/types';

const ManagementPage = () => {
  const {
    useAuth: { id, accessType },
  } = useGlobalState();
  const [studentSubjects, setStudentSubjects] = useState<
    FetchSubjectResponseDTO[]
  >([]);

  const { data: subjects = [], isLoading } = useFetchSubjects();

  const {
    data: studentSubjectsData = [],
    isLoading: isFetchingStudentSubjects,
    isSuccess,
  } = useFetchStudentSubjects(id);

  useEffect(() => {
    if (isSuccess) {
      const mappedStudentSubjects: FetchSubjectResponseDTO[] =
        studentSubjectsData.map((studentSubject) => studentSubject.subject);

      setStudentSubjects(mappedStudentSubjects);
    }
  }, [isSuccess]);

  return (
    <AdminLayout>
      <ManagementList
        subjects={
          accessType === AccessType.Student ? studentSubjects : subjects
        }
        isLoading={isLoading || isFetchingStudentSubjects}
      />
    </AdminLayout>
  );
};

export default ManagementPage;
