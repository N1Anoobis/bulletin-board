export const initialState = {
  posts: {
    data: [{
      user:"logged user",
      email:"mike4@hotmail.com",
      title:"Hi I want to sell dinosaur",
      text:"really nice 120 years old animal. is friendly",
      date:"2020-10-16 12:42:27",
      status:"published",
    },{
      user:"logged user",
      email:"herman8@hotmail.com",
      title:"Hello I looking for plumber",
      text:"just need to fix my sink in kitchen",
      date:"2020-10-18 12:41:27",
      status:"published",
    }
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
    },
    {
      id: 3,
      name: 'admin',
      status: 'admin',
    },
  ],
  globalStatus:{globalStatus:'denaied'}
};
