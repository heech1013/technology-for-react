/* Promise 기반 액션들을 관리하는 미들웨어가 포함되어 있는 라이브러리.
  액션 객체 안에 payload가 Promise 형태라면 시작하기 전, 완료 또는 실패를 했을 때
  PENDING, SUCCESS, FAILURE 접미사를 붙여준다. */

import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';

const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger, penderMiddleware()));

export default store;