import { AdminLayout } from '@/components/Layout';
import { useFetchSubjects } from '../api/fetchSubjects';
import TeacherSubjecs from '../components/ManagementList/TeacherSubjects';
import { useParams } from 'react-router-dom';

const TeacherSubjectsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: subjects = [], isLoading } = useFetchSubjects({
    teacher_id: id,
  });

  return (
    <AdminLayout>
      <TeacherSubjecs subjects={subjects} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default TeacherSubjectsPage;
