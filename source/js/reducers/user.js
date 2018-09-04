import { GET_USER_SUCCESS } from 'actions/user';

const initialState = {};

const actionsMap = {
  [GET_USER_SUCCESS]: (state, data) => {
    return {
      ...data,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action.payload) : state;
}
