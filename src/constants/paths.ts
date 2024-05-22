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
    ATTENDANCE_RECORDS: '/profile/attendance-records',
  },
  ACCOUNT: {
    BASE: '/account',
    CREATE: '/account/create',
    UPDATE: '/account/:id',
  },
  MANAGEMENT: {
    BASE: '/management',
    SUBJECTS: '/management/subjects',
    TEACHERS: '/management/teachers',
    TEACHER_SUBJECTS: '/management/teacher/:id/subjects',
    TEACHER_ATTENDANCE_RECORD: '/management/teacher/:id/attendance',
    CREATE_SUBJECT: '/management/create-subject',
    STUDENT_LIST: '/management/subject/:id/student-list',
    ATTENDANCE: '/management/subject/:id/attendance',
    ATTENDANCE_RECORD: '/management/subject/:id/attendance/:studentId',
    ASSIGNMENTS: '/management/subject/:id/assignments',
    SUBMISSIONS:
      '/management/subject/:id/assignments/:assignmentId/submissions',
  },
  DOCUMENTS: {
    BASE: '/documents',
  },
  FACILITIES: {
    BASE: '/facilities',
    REQUESTS: '/facilities/requests',
    REPORTS: '/facilities/reports',
  },
  ANNOUCEMENTS: {
    BASE: '/announcements',
  },
  MESSAGES: {
    INBOX: '/messages/inbox',
    SENT: '/messages/sent',
    MESSAGE: '/messages/inbox/:id',
  },
};
