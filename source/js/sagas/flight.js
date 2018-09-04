import { takeEvery, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import TravelServiceApi from 'api/travelServiceApi';

import { GET_USER_SUCCESS } from 'actions/user';
import {
  GET_FLIGHT,
  GET_FLIGHT_SUCCESS,
  GET_FLIGHT_ERROR,
  GET_FLIGHT_SUCCESS_2,
  GET_FLIGHT_ERROR_2,
  GET_FLIGHT_SUCCESS_3,
  GET_FLIGHT_ERROR_3,
} from 'actions/flight';

export const GET_DEPARTURE_SUCCESS = 'GET_DEPARTURE_SUCCESS';

function* loadDashboardSequenced() {
  try {
    // yield take(GET_USER_SUCCESS);
    const user = yield select(state => state.user); // or you case use <> const user = yield take(GET_USER_SUCCESS);
    const departure = yield call(TravelServiceApi.getDeparture, user);
    const flight = yield call(TravelServiceApi.getFlight, departure.flightID);
    const forecast = yield call(TravelServiceApi.getForecast, departure.date);
    yield put({ type: GET_FLIGHT_SUCCESS, payload: { forecast, flight, departure } });
  } catch (error) {
    yield put({ type: GET_FLIGHT_ERROR, error: error.message });
  }
}






















function* loadDashboardSequenced2() {
  try {
    // yield take(GET_USER_SUCCESS);
    const user = yield select(state => state.user);
    const departure = yield call(TravelServiceApi.getDeparture, user);
    const [flight, forecast] = yield [
      call(TravelServiceApi.getFlight, departure.flightID),
      call(TravelServiceApi.getForecast, departure.date),
    ];
    yield put({ type: GET_FLIGHT_SUCCESS_2, payload: { forecast, flight, departure } });
  } catch (error) {
    yield put({ type: GET_FLIGHT_ERROR_2, error: error.message });
  }
}




















function* getFlight(departure) {
  const flight = yield call(TravelServiceApi.getFlight, departure.flightID);
  yield put({ type: GET_FLIGHT_SUCCESS_3, payload: { flight } });
}

function* getForecast(departure) {
  const forecast = yield call(TravelServiceApi.getForecast, departure.date);
  yield put({ type: GET_FLIGHT_SUCCESS_3, payload: { forecast } });
}


function* loadDashboardSequenced3() {
  try {
    const user = yield select(state => state.user);
    // if (!user.email) {
    //   yield take(GET_USER_SUCCESS);
    //   user = yield select(state => state.user);
    // }
    const departure = yield call(TravelServiceApi.getDeparture, user);
    yield put({ type: GET_FLIGHT_SUCCESS_3, payload: { departure } });

    yield fork(getFlight, departure);
    yield fork(getForecast, departure);
  } catch (error) {
    yield put({ type: GET_FLIGHT_ERROR_3, error: error.message });
  }
}






















export function* watchLoadDashboard() {
  yield takeEvery(GET_FLIGHT, loadDashboardSequenced);
}

export function* watchLoadDashboard2() {
  yield takeLatest(GET_FLIGHT, loadDashboardSequenced2);
}

export function* watchLoadDashboard3() {
  yield takeLatest(GET_FLIGHT, loadDashboardSequenced3);
}

export default [
  // watchLoadDashboard(),
  // watchLoadDashboard2(),
  watchLoadDashboard3(),
];
