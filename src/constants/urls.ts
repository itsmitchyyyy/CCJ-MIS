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
};
