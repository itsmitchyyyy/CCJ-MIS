import { AdminLayout } from '@/components/Layout';
import { AddSubject } from '../components/AddSubject/AddSubject';
import { useAddSubject } from '../api/addSubject';
import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';

const AddSubjectPage = () => {
  const { mutate: addSubject, isPending, isSuccess } = useAddSubject();

  const handleSubmit = (data: AddSubjectRequest) => {
    addSubject(data);
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
