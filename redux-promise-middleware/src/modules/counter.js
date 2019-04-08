import { handleActions, createAction } from 'redux-actions';

// 모듈이 하나이기 때문에 액션 이름의 접두사는 생략한다.
const INCREMENT = 'INCREMEMT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

export const incrementAsync = () => dispatch => {
  // 1초 뒤 액션을 디스패치
  setTimeout(
    () => { dispatch(increment()) },
    1000
  );
}
export const decrementAsync = () => dispatch => {
  setTimeout(
    () => { dispatch(decrement()) },
    1000
  );
}
 
export default handleActions({
  [INCREMENT]: (state, action) => state + 1,
  [DECREMENT]: (state, action) => state - 1
}, 1);  // 카운터 모듈의 기본 값은 1이다.