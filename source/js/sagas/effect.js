import { put, call, takeLatest, race, fork, spawn } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import TravelServiceApi from 'api/travelServiceApi';

import { FETCH_RACE, FETCH_FORK } from 'actions/effect';

function* fetchRaceEffect() {
  const { user, timeout } = yield race({
    user: call(TravelServiceApi.getUser),
    timeout: call(delay, 900),
  });
  if (user) {
    put({ type: 'POSTS_RECEIVED', user });
  }
  else {
    put({ type: 'TIMEOUT_ERROR', timeout });
  }
}
function* fork1() {
  yield delay(1000);
  console.log('Fork 1');
}

function* fork2() {
  yield delay(1000);
  console.log('Fork 2');
}

function fork3() {
  delay(1000);
  console.log('Fork 3');
}

function* fork4() {
  while (true) {
    console.log('Fork 4');
    yield delay(1000);
  }
}

function* spawn1() {
  while (true) {
    console.log('Meet error? Let it be!');
    yield delay(1000);
  }
}

function* fetchForkEffect() {
  yield fork(fork1);
  fork2();
  fork3();
  yield fork(fork4);
  yield spawn(spawn1);
  yield delay(3000);
  console.log('main fork');
  throw new Error();
}

function* watchRaceEffect() {
  yield takeLatest(FETCH_RACE, fetchRaceEffect);
}

function* watchForkEffect() {
  yield takeLatest(FETCH_FORK, fetchForkEffect);
}

export default [
  watchRaceEffect(),
  watchForkEffect(),
];

