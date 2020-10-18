export const initialState = {
  posts: {
    data: [{
      id: '1',
      user: 'logged',
      email: 'logged@hotmail.com',
      title: 'Hi I want to sell dinosaur',
      text: 'really nice 120 years old animal. is friendly',
      date: '2020-10-16 12:42:27',
      status: 'published',
    }, {
      id: '2',
      user: 'logged',
      email: 'logged@hotmail.com',
      title: 'Hello I looking for plumber',
      text: 'just need to fix my sink in kitchen',
      date: '2020-10-18 12:41:27',
      status: 'published',
    }, {
      id: '3',
      user: 'different user',
      email: 'robert1@hotmail.com',
      title: 'Hello different user can be edited only by admin',
      text: 'you can not edit this post as sorry',
      date: '2020-10-18 12:46:27',
      status: 'closed',
    },
    ],
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
      email: 'logged@hotmail.com',
    },
    {
      id: 3,
      name: 'admin',
      status: 'admin',
    },
  ],
  globalStatus: { globalStatus: 'denaied' },
};
