import { PATHS } from '@/constants/paths';
import { Outlet, RouteObject } from 'react-router-dom';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import ManagementPage from './ManagementPage';
import AddSubjectPage from './AddSubjectPage';
import StudentListPage from './StudentListPage';
import AttendancePage from './AttendancePage';
import AttendanceRecordPage from './AttendanceRecordPage';
import AssignmentsPage from './AssignmentsPage';
import SubmissionsPage from './SubmissionsPage';
import TeacherListPage from './TeacherListPage';
import TeacherSubjectsPage from './TeacherSubjectsPage';
import TeacherAttendanceRecordPage from './TeacherAttendanceRecordPage';

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
      path: PATHS.MANAGEMENT.SUBJECTS,
      element: <ManagementPage />,
    },
    {
      path: PATHS.MANAGEMENT.TEACHERS,
      element: <TeacherListPage />,
    },
    {
      path: PATHS.MANAGEMENT.TEACHER_SUBJECTS,
      element: <TeacherSubjectsPage />,
    },
    {
      path: PATHS.MANAGEMENT.TEACHER_ATTENDANCE_RECORD,
      element: <TeacherAttendanceRecordPage />,
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
    {
      path: PATHS.MANAGEMENT.SUBMISSIONS,
      element: <SubmissionsPage />,
    },
  ],
};
