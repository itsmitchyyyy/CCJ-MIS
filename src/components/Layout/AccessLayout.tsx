import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { NotFound } from '../Elements/NotFound';

type Props = {
  access_type: AccessType;
  children: React.ReactNode;
};

const AccessLayout = ({ children, access_type }: Props) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  return accessType === access_type ? children : <NotFound />;
};

export default AccessLayout;
