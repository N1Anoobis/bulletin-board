export const initialState = {
  posts: {
    data: {},
    loading: {
      active: false,
      error: false,
    },
  },
  users: [
    {
      id: 1,
      name: 'unknown',
      status: 'denided',
    },
    {
      id: 2,
      name: 'logged',
      status: 'granted',
    },
    {
      id: 3,
      name: 'admin',
      status: 'granted',
    },
  ],
};
