import { AdminLayout } from '@/components/Layout';
import ManagementList from '../components/ManagementList/ManagementList';
import { useFetchSubjects } from '../api/fetchSubjects';
import { useEffect, useState } from 'react';
import { useFetchStudentSubjects } from '../api/fetchStudentSubjects';
import { useGlobalState } from '@/hooks/global';
import { FetchSubjectResponseDTO, Grade } from '@/core/domain/dto/subject.dto';
import { AccessType } from '@/features/account/types';
import { useSearchParams } from 'react-router-dom';

const ManagementPage = () => {
  const {
    useAuth: { id, accessType },
  } = useGlobalState();

  const [searchParams, _] = useSearchParams();
  const search = searchParams.get('search') || undefined;

  const [studentSubjects, setStudentSubjects] = useState<
    FetchSubjectResponseDTO[]
  >([]);
  const [studentGrades, setStudentGrades] = useState<
    { user_id: string; subject_id: string; grade: Grade }[]
  >([]);

  const { data: subjects = [], isLoading } = useFetchSubjects(
    accessType === AccessType.Teacher ? { teacher_id: id, search } : { search },
  );

  const {
    data: studentSubjectsData = [],
    isLoading: isFetchingStudentSubjects,
    isSuccess,
  } = useFetchStudentSubjects(id, { search });

  useEffect(() => {
    if (isSuccess) {
      const mappedStudentSubjects: FetchSubjectResponseDTO[] =
        studentSubjectsData.map((studentSubject) => studentSubject.subject);

      const mappedStudentSubjectsGrades: {
        user_id: string;
        subject_id: string;
        grade: Grade;
      }[] = studentSubjectsData.map(({ grade, subject_id, student_id }) => ({
        user_id: student_id,
        subject_id,
        grade,
      }));

      setStudentGrades(mappedStudentSubjectsGrades);
      setStudentSubjects(mappedStudentSubjects);
    }
  }, [isSuccess]);

  return (
    <AdminLayout>
      <ManagementList
        subjects={
          accessType === AccessType.Student ? studentSubjects : subjects
        }
        grades={accessType === AccessType.Student ? studentGrades : []}
        isLoading={isLoading || isFetchingStudentSubjects}
      />
    </AdminLayout>
  );
};

export default ManagementPage;
