// 스토어를 생성하는 함수인 configure 구현.
// 함수를 따로 만드는 이유는, 스토어를 클라이언트에서 생성하지만, 추후 서버사이드 렌더링을 할 때 서버에서도 호출해야 하기 때문.
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers(modules);  // 서브 리듀서 통합
const middlewares = [penderMiddleware()];  // ?

// 개발 모드일 때만 Redux Devtools 적용
const isDev = process.env.NODE_ENV === 'development';
// 크롬 확장 프로그램에 작성되어있는 자바스크립트 함수(리덕스 개발툴과 compose를 통한 미들웨어를 함께 사용하기 위함).
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// 만약에 리덕스 개발자도구가 설치되어있지 않다면 일반 compose 를 사용.
const composeEnhancers = devtools || compose;  // compose: 함수를 오른쪽에서 왼쪽으로 조합한다.

// preloadedState: 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태
const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(
  applyMiddleware(...middlewares)
));

export default configure;