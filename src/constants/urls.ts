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
  },
  documents: {
    base: '/documents',
  },
};
