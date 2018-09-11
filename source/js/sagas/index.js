import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import userSagas from 'sagas/user';
import flight from 'sagas/flight';
import effect from 'sagas/effect';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...userSagas,
    ...flight,
    ...effect(),
  ]);
}
