/* selectors */

export const globalStatus = ({ globalStatus }) => globalStatus;

/* action name creator */
const reducerName = 'globalStatus';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */

const SET_STATUS = createActionName('SET_STATUS');


export const setGlobalStatus = payload => ({ payload, type: SET_STATUS });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...statePart,
        globalStatus: action.payload,
      };
    default:
      return statePart;
  }
};