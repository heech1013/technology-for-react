import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';

import promseMiddleware from 'redux-promise-middleware';

const logger = createLogger();
const pm = promiseMiddleware({
  promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']  // FULFILLED, REJECTED 대신 임의의 값을 설정(옵션)
});

const store = createStore(modules, applyMiddleware(logger, pm));

export default store;