import { AdminLayout } from '@/components/Layout';
import { CreateAccount } from '../components/CreateAccount';
import { useCreateAccount } from '../api/createAccount';

const CreateAccountPage = () => {
  const { isPending, mutate: createAccount, isSuccess } = useCreateAccount();

  const onSubmit = (data: CreateAccountDetails) => {
    createAccount(data);
  };

  return (
    <AdminLayout>
      <CreateAccount
        onSubmit={onSubmit}
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </AdminLayout>
  );
};

export default CreateAccountPage;
