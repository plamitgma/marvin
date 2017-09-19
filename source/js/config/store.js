import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'dev/logger';
import { Map } from 'immutable';

// Remove if you are not using server rendering
// Also remove following packages from package.json
// "express"
// "nodemon"
// "concurrently"

import rootReducer from 'reducers';

const isProduction = process.env.NODE_ENV === 'production';

// Remove if you are not using server rendering
let INIT_STATE = null;
const initImmutableState = {};

// Remove if you are not using server rendering
try {
  INIT_STATE = __MARVIN_DEHYDRATED_STATE; // eslint-disable-line no-undef
} catch (e) {
  console.log('★★ Marvin: No dehydrated state'); // eslint-disable-line no-console
}

// Remove if you are not using server rendering
if (INIT_STATE) {
  // If state exists we need to parse it to JS object
  INIT_STATE = JSON.parse(INIT_STATE);

  // Then we iterate over reducers and convers them from JS object to Immutable Map
  Object.keys(INIT_STATE).forEach(key => {
    initImmutableState[key] = Map(INIT_STATE[key]);
  });
}

// Creating store
export default () => {
  let store = null;
  let middleware = null;

  if (isProduction) {
    // In production adding only thunk middleware
    middleware = applyMiddleware(thunk);
  } else {
    // In development mode beside thunk
    // logger and DevTools are added
    middleware = applyMiddleware(thunk, logger);

    // Enable DevTools if browser extension is installed
    if (!process.env.SERVER_RENDER && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  // Add dehydrated state if any
  if (INIT_STATE) {
    // Remove if you are not using server rendering
    store = createStore(
      rootReducer,
      initImmutableState,
      middleware
    );
  } else {
    store = createStore(
      rootReducer,
      middleware
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
