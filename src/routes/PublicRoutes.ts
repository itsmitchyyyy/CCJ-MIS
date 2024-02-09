import { useGlobalState } from '@/hooks/global';
import { useEffect } from 'react';

const PublicRoutes = ({ children }: { children: JSX.Element }) => {
  const {
    useAuth: { isLoggedIn, token },
  } = useGlobalState();

  useEffect(() => {
    console.log(token, 'tokentokentokentoken');

    if (isLoggedIn) {
      //TODO: Replace with actual home page
    }
  }, [isLoggedIn, token]);
  return children;
};

export default PublicRoutes;
