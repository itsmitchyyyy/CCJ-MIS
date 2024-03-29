export const PATHS = {
  BASE: '/',
  PREVIOUS: -1,
  AUTH: {
    LOGIN: '/login',
  },
  DASHBOARD: {
    BASE: '/dashboard',
  },
  PROFILE: {
    BASE: '/profile',
  },
  ACCOUNT: {
    BASE: '/account',
    CREATE: '/account/create',
    UPDATE: '/account/:id',
  },
  MANAGEMENT: {
    BASE: '/management',
    CREATE_SUBJECT: '/management/create-subject',
    STUDENT_LIST: '/management/subject/:id/student-list',
    ATTENDANCE: '/management/subject/:id/attendance',
    ATTENDANCE_RECORD: '/management/subject/:id/attendance/:studentId',
  },
  DOCUMENTS: {
    BASE: '/documents',
  },
};
