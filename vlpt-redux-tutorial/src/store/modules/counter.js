// 카운터 관련 상태 로직
// Ducks 구조(액션 + 리듀서)

import { createAction, handleActions } from 'redux-actions';

// 액션 타입 정의
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성 함수
/* createAction 적용 전 코드 
  export const increment = () => ({ type: INCREMENT });
  export const decrement = () => ({ type: DECREMENT });
*/ 
// createAction 적용
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);


// 모듈의 초기 상태
const initialState = {
  number: 0
};

// 리듀서
/* handleActions 적용 전 코드
  export default function reducer(state=initialState, acton) {
    switch(action.type) {
      case INCREMENT:
        return { number: state.number + 1};
      case DECREMENT:
        return { number: state.number - 1};
      default:
        return state;
    }
  }
*/
// handleActions 적용(switch case의 스코프 문제로 인한 불편함 개선)
export default handleActions({
  [INCREMENT]: (state, action) => {
    return { number: state.number + 1};
  },
  // action 객체를 참조하지 않으니, state의 비구조화 할당을 활용해 다음과 같이 작성할 수도 있다.
  [DECREMENT]: ({ number }) => ({ number: number - 1 })
}, initialState);