import { combineReducers } from 'redux';
import counter from './counter';
import post from './post';
import { penderReducer } from 'redux-pender';

/* 미들웨어 적용 후, 라이브러리 안에 내장된 리듀서를 루트 리듀서에 넣어 주어야 한다. */
export default combineReducers({
  counter,
  post,
  pender: penderReducer
});

/* pender 리듀서는 요청 상태를 관리한다. 이 리듀서가 가진 상태 구조는 다음과 같다.
{
  pending: {},
  success: {},
  failure: {}
}

새 Promise 기반 액션을 디스패치하면 상태는 진행 정도에 따라 다음과 같이 변한다.
{
  pending: {
    'ACTION_NAME': false
  },
  success: {
    'ACTION_NAME': false
  },
  failure: {
    'ACTION_NAME': false
  }
}
*/