import { AdminLayout } from '@/components/Layout';
import { AddSubject } from '../components/AddSubject/AddSubject';
import { useAddSubject } from '../api/addSubject';
import { SubjectRequest } from '../types';

const AddSubjectPage = () => {
  const { mutate: addSubject, isPending, isSuccess } = useAddSubject();

  const handleSubmit = (data: SubjectRequest) => {
    const { days, ...rest } = data;

    const formattedDays = days.join(',');
    addSubject({ ...rest, days: formattedDays });
  };

  return (
    <AdminLayout>
      <AddSubject
        onSubmit={handleSubmit}
        isPending={isPending}
        isSuccess={isSuccess}
      />
    </AdminLayout>
  );
};

export default AddSubjectPage;
