import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

/* 스토어: 안에 현재 상태가 내장되어 있고, 상태를 업데이트할 때마다 구독 중인 함수들을 호출한다.
  리액트에서 스토어를 생성할 때는 보통 프로젝트의 엔트리 포인트인 src/index.js 파일에서 만든다. */

// 리덕스 관련 불러오기
import { createStore } from 'redux';
import reducers from './reducers';

/* Provider: react-redux 라이브러리에 내장된, 리액트 애플리케이션에 손쉽게 스토어를 연동할 수 있도록 도와주는 컴포넌트
  Provider 컴포넌트로 연동할 프로젝트의 최상위 컴포넌트를 감싸고, props로 store를 넣어 준다. */
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());  // 크롬 redux 탭의 스토어 설정

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
