import AdminRepositoryInterface from '@/core/usecases/ports/admin.repository.interface';

export interface IAdminProvider {
  adminRepository: AdminRepositoryInterface;
}

const adminProvider = ({
  adminRepository,
}: {
  adminRepository: AdminRepositoryInterface;
}): IAdminProvider => {
  return { adminRepository };
};

export default adminProvider;
