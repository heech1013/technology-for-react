// 액션 타입을 상수 값으로 정의
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 액션 생성 함수 정의(액션은 객체이다)
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
  
});
const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff
});

// 리듀서가 초기에 사용할 초기 상태 값을 설정해야 리듀서를 만들 수 있다.
const initialState = {
  number: 1,
  foo: 'bar',
  baz: 'qux'
};

// 리듀서 함수 정의
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        number: state.number + action.diff
      }
    case DECREMENT:
      return {
        ...state,
        number: state.number - action.diff
      }
    default:
      return state;
  }
}

// 스토어: 액션과 리듀서가 준비되어야 한다.
const { createStore } = Redux;
const store = createStore(counter);

// 구독: 원래는 react-redux의 connect 함수가 대신한다.
// 리덕스 스토어의 상태가 바뀔 때마다 특정 함수를 실행시킨다.
// 추후 구독을 취소해야 할 때는 unsubscribe()를 입력하여 호출한다.
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
});

// 스토어에 액션을 넣는다.
store.dispatch(increment(1));
store.dispatch(decrement(5));
store.dispatch(increment(10));

/* 리덕스의 세 가지 규칙
  1. 스토어는 단 한 개 (리듀서는 여러 개 만들어서 관리할 수 있다)
  2. 리덕스의 state(상태)는 읽기 전용
    : 상태를 업데이트할 때는 언제나 새 상태 객체를 만들어서 넣어 주어야 한다.
  3. 변화는 순수 함수로 구성
    : 함수란 리듀서 함수를 가리킨다.
    순수 함수에서 결과 값을 출력할 때는 파라미터 값에만 의존해야 하며, 같은 파라미터는 언제나 같은 결과를 출력해야 한다.
    예를 들면 리듀서 함수 내부에서 외부 네트워크와 데이터베이스에 직접 접근하면 안된다.
    리듀서 함수 내에서는 현재 날짜를 반환하는 new Date() 함수나 Math.random() 함수 등도 사용하면 안된다.
  
*/