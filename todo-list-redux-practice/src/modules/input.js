import { Map } from 'immutable';
import { handleActions, createActions } from 'redux-actions';

// 액션 타입 정의. 문자열의 앞부분에 리듀서 이름을 적어준다.
const SET_INPUT = 'input/SET_INPUT';

// 액션 생성 함수
export const setInput = createAction(SET_INPUT);

// 리듀서의 초기 상태
const initialState = Map({
  value: ''
});

// 리듀서 생성
export default handleActions({
  [SET_INPUT]: (state, action) => {
    return state.set('value', action.payload)
  }
}, initialState);