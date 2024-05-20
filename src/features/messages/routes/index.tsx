import { PATHS } from '@/constants/paths';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import { Outlet, RouteObject } from 'react-router-dom';
import InboxPage from './InboxPage';

export const MessageRoutes: RouteObject = {
  path: PATHS.MESSAGES.INBOX,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <InboxPage />,
    },
  ],
};
