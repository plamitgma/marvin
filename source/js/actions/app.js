import api from 'api';

export const TEST_ACTION = 'TEST_ACTION';

export const TEST_ASYNC_ACTION_START = 'TEST_ASYNC_ACTION_START';
export const TEST_ASYNC_ACTION_ERROR = 'TEST_ASYNC_ACTION_ERROR';
export const TEST_ASYNC_ACTION_SUCCESS = 'TEST_ASYNC_ACTION_SUCCESS';

// Test action

export function testAction() {
  return {
    type: TEST_ACTION,
  };
}

// Async action example

export function testAsyncStart() {
  return {
    type: TEST_ASYNC_ACTION_START,
  };
}

export function testAsyncSuccess(data) {
  return {
    type: TEST_ASYNC_ACTION_SUCCESS,
    data,
  };
}

export function testAsyncError(error) {
  return {
    type: TEST_ASYNC_ACTION_ERROR,
    error,
  };
}

export function testAsyncFetch(dispatch, callback) {
  api.testAsync()
    .then(data => {
      dispatch(testAsyncSuccess(data));

      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      dispatch(testAsyncError(error));

      if (typeof callback === 'function') {
        callback();
      }
    });
}

export function testAsync() {
  return function (dispatch) {
    dispatch(testAsyncStart());

    testAsyncFetch(dispatch);
  };
}

// Update
