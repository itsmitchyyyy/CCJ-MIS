export default {
  auth: {
    login: `/login`,
    register: `/register`,
    logout: `/logout`,
    changePassword: '/change-password',
  },
  user: {
    base: '/user',
    update: (id: string | number) => `/user/${id}`,
    store: '/user',
    list: '/users',
    delete: (id: string | number) => `/user/${id}`,
    get: (id: string | number) => `/user/${id}`,
  },
  teachers: {
    base: '/teachers',
  },
  subjects: {
    base: '/subjects',
    students: (id: string | number) => `/subjects/${id}/students`,
    deleteStudent: (subjectId: string | number, studentId: string | number) =>
      `/subjects/${subjectId}/students/${studentId}`,
    grades: (subjectId: string, studentId: string | number) =>
      `/subjects/${subjectId}/students/${studentId}/grades`,
  },
  students: {
    base: '/students',
    get: (id: string | number) => `/students/${id}`,
    getSubjects: (id: string | number) => `/students/${id}/subjects`,
  },
  attendances: {
    base: '/attendances',
    get: (id: string | number) => `/attendances/${id}`,
    update: (id: string | number) => `/attendances/${id}`,
    teacher: '/teacher-attendances',
  },
  documents: {
    base: '/documents',
    requests: '/document-requests',
    storedDocuments: '/documents/fetch-stored-documents',
    addNewFolder: '/documents/create-new-folder',
  },
  assignments: {
    base: '/assignments',
    studentAssignment: '/student-assignments',
    studentAssignmentExists: (
      studentId: string | number,
      assignmentId: string | number,
    ) => `/student-assignments/${studentId}/${assignmentId}/exists`,
  },
  facilities: {
    base: '/facilities',
    requests: '/facility-requests',
  },
  announcements: {
    base: '/announcements',
    store: '/announcements',
  },
  settings: {
    base: '/settings',
  },
  messages: {
    base: '/messages',
    threads: (id: string | number) => `/messages/threads/${id}`,
  },
  notifications: {
    base: '/notifications',
  },
};
