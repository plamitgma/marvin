import {
  GET_FLIGHT_SUCCESS_3,
} from 'actions/flight';

const initialState = {};

const actionsMap = {
  [GET_FLIGHT_SUCCESS_3]: (state, data) => {
    return {
      ...state,
      ...data,
    };
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action.payload) : state;
}
