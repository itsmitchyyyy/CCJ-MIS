import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import ManagementPage from './ManagementPage';
import AddSubjectPage from './AddSubjectPage';
import StudentListPage from './StudentListPage';
import AttendancePage from './AttendancePage';
import AttendanceRecordPage from './AttendanceRecordPage';
import AssignmentsPage from './AssignmentsPage';

export const ManagementRoutes: RouteObject = {
  path: PATHS.MANAGEMENT.BASE,
  element: (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  ),
  children: [
    {
      path: '',
      element: <ManagementPage />,
    },
    {
      path: PATHS.MANAGEMENT.CREATE_SUBJECT,
      element: <AddSubjectPage />,
    },
    {
      path: PATHS.MANAGEMENT.STUDENT_LIST,
      element: <StudentListPage />,
    },
    {
      path: PATHS.MANAGEMENT.ATTENDANCE,
      element: <AttendancePage />,
    },
    {
      path: PATHS.MANAGEMENT.ATTENDANCE_RECORD,
      element: <AttendanceRecordPage />,
    },
    {
      path: PATHS.MANAGEMENT.ASSIGNMENTS,
      element: <AssignmentsPage />,
    },
  ],
};
