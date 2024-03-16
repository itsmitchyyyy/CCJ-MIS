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
  },
  students: {
    base: '/students',
  },
};
