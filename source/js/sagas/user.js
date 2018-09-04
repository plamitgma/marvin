import { put, call, takeLatest } from 'redux-saga/effects';
import TravelServiceApi from 'api/travelServiceApi';

import { GET_USER, GET_USER_SUCCESS } from 'actions/user';

function* getUser() {
  const user = yield call(TravelServiceApi.getUser);
  yield put({
    type: GET_USER_SUCCESS,
    payload: user,
  });
}

function* watchGetUser() {
  yield takeLatest(GET_USER, getUser);
}

export default [
  watchGetUser(),
];

