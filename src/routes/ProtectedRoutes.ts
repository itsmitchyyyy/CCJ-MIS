import { useGlobalState } from '@/hooks/global';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const {
    useAuth: { isLoggedIn, token },
  } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, token]);

  return children;
};

export default ProtectedRoutes;
