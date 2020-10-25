import Axios from 'axios';
/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getPostById = ({ posts }) => posts.post;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const FETCH_POST = createActionName('FETCH_POST');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchSinglePost = payload => ({ payload, type: FETCH_POST });
export const addNewPost = payload => ({ payload, type: ADD_POST });
export const editSinglePost = (payload) => ({ payload, type: EDIT_POST });
/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {

    dispatch(fetchStarted());
    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchSingledPosts = (id) => {
  return async (dispatch,state) => {
    dispatch(fetchStarted());
    try {
      let res = await Axios.get(`http://localhost:8000/api/post/${id}`);
      dispatch(fetchSinglePost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message || true));
    }
  };
};

export const addNewAdvert = (newPost) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      let res = await Axios.post(`http://localhost:8000/api/posts/add`, newPost, { headers: { 'Content-Type': 'multipart/form-data' } });
      dispatch(addNewPost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const editSingledAdvert = (edited) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      let res = await Axios.put(`http://localhost:8000/api/post/${edited.id}/edit`, edited, { headers: { 'Content-Type': 'multipart/form-data' } });
      dispatch(editSinglePost(res));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        post: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map(post => {
          return (post.id === action.payload.id ? { ...action.payload } : post);
        }),
      };
    }
    default:
      return statePart;
  }
};
