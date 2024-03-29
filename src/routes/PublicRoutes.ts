import { useGlobalState } from '@/hooks/global';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }: { children: JSX.Element }) => {
  const {
    useAuth: { isLoggedIn, token },
  } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, token]);
  return children;
};

export default PublicRoutes;
