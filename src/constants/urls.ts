export default {
  auth: {
    login: `/login`,
    register: `/register`,
    logout: `/logout`,
  },
  user: {
    base: '/user',
    update: (id: string | number) => `/user/${id}`,
    store: '/user',
    list: '/users',
  },
};
