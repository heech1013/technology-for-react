import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

/* Ducks 구조 조건 - 액션 타입 이름은 npm-module-or-app/reducers/ACTION_TYPE 형식으로 만들어야 한다.
  (맨 앞은 생략 가능) */
const SET_INPUT = 'input/SET_INPUT';

// 액션 생성 함수
/* Ducks 구조 조건 - export를 이용하여 액션생성함수를 내보내야 한다. */
export const setInput = createAction(SET_INPUT);

const initialState = Map({
  value: ''
});

/* Ducks 구조 조건 - export default를 이용하여 리듀서를 내보내야 한다. */
/* handleActions from redux-actions
  첫 번째 파라미터: 액션에 따라 실행할 함수들을 가진 객체
  두 번째 파라미터: 상태의 기본 값 */
export default handleActions({
  [SET_INPUT]: (state, action) => {
    return state.set('value', action.payload)
  }
}, initialState);

