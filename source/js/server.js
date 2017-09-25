import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { Provider } from 'react-redux';

import 'babel-polyfill';

import configureStore from 'config/store';
import getServerHtml from 'config/server-html';
import Server from 'views/Server';

import { testAsyncFetch } from 'actions/app';

// Load SCSS
import '../scss/app.scss';

const app = express();
const hostname = 'localhost';
const port = 8080;

const respond = (req, res, store) => {
  // Dehydrates the state
  const stateImmutable = store.getState();
  const stateJS = {};
  // Iterates over reducers and convert them from Immutable Map to JS object
  Object.keys(stateImmutable).forEach(key => {
    stateJS[key] = stateImmutable[key].toJS();
  });
  // the first JSON.stringify converts object to string
  // the second JSON.stringify escapes that string
  // then we can output it in the HTML and parse on the client
  const dehydratedState = JSON.stringify(JSON.stringify(stateJS));

  // Context is passed to the StaticRouter and it will attach data to it directly
  const context = {};

  const appHtml = ReactDOMServer.renderToString(
    <Provider store={ store }>
      <Server location={ req.url } context={ context } />
    </Provider>
  );

  const serverHtml = getServerHtml(appHtml, dehydratedState);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    // We're good, send the response
    res.status(context.status || 200).send(serverHtml);
  }

  // TODO how to handle 50x errors?
};

const fetchData = (req, res, store) => {
  const respondCallback = () => respond(req, res, store);

  const routeMapper = {
    '/': () => {
      testAsyncFetch(store.dispatch, respondCallback);
    },
  };

  return routeMapper[req.url] || null;
};

app.use('/client', express.static('build/client'));

app.use((req, res) => {
  // Creates empty store for each request
  const store = configureStore();

  const action = fetchData(req, res, store);

  if (action) {
    action();
  } else {
    respond(req, res, store);
  }
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});
