<Fragment>
/* src */
- index.js
  - 프로젝트의 entry point
  - src의 <App/> 렌더링 (최상위)
  - 스토어 생성 (리듀서를 불러와 createStore)
  - Provider를 통해 리듀서와 리액트 앱를 연동
  - 리덕스 개발자 도구에 스토어 연동
      const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/* src - actions */
: 액션 타입과 액션 생성자 파일을 저장
- ActionTypes.js: 액션 타입 정의
- index.js: 액션 생성 함수 정의

/* src - components */
: 컴포넌트의 뷰가 어떻게 생길지만 담당하는 프리젠테이셔널 컴포넌트를 저장
- Counter.js: 숫자, 색상 값, 더하기, 빼기, 색생 변경 함수를 props로 전달 받음
- Counter.css: Counter 컴포넌트의 스타일링

/* src - container */
: 스토어에 있는 상태를 props로 받아 오는 컨테이너 컴포넌트를 저장
- App.js:
- CounterContainer.js
  - connect: 스토어를 컴포넌트에 연결한다.
    - mapStateToProps: state를 받아 컴포넌트의 props로 사용할 객체를 반환
    - mapDispatchToProps: dispatch를 받아 액션을 디스패치하는 함수들을 객체로 반환
    - connect의 파라미터로 리덕스에 연결할 컴포넌트를 전달하면, 위의 함수들에서 정의한 값들을 props로 받아오는 새 컴포넌트를 반환

/* src - reducers */
: 스토어의 기본 상태 값과 상태의 업데이트를 담당하는 리듀서 파일들을 저장
- index.js: 서브 리듀서들을 통합시키는 루트 리듀서
  - 최초 변화를 일으키기 전 가지고 있어야 할 초기 상태를 정의(initialState): color, number
  - state를 직접 수정하면 절대 안되고, 기존 state 값에 새 상태를 덮어쓴 상태 객체를 만드는 방식으로 처리해야 한다.
  - 리듀서 함수 정의: state와 action을 파라미터로 받는다.
  - combineReducers를 사용하여 서브 리듀서들을 통합하고 나면,
    파라미터로 전달한 객체 모양대로 나중에 store 형태가 만들어진다.
    이에 따라 해당 컨테이너 컴포넌트의 mapStateToProps를 수정해야 한다.
- color.js : color state를 담당하는 서브 리듀서
- number.js: number state를 담당하는 서브 리듀서
  

/* src - lib */
: 일부 컴포넌트에서 함께 사용되는 함수들을 저장

/* redux 모듈 */
* bindActionCreators: mapDispatchToProps에서의 작업을 간단하게 해줌.
  - 기존:
    inputActions: {
      setInput: (value) => dispatch(inputActions.setInput(value))
    }
  - 적용:
    InputActions: bindActionCreators(inputActions, dispatch)
  - 나중에 이를 호출할 때는, this.props.InputActions.setInput을 호출하면 된다.

/* redux-actions 모듈 */
* createActions: 액션 생성 함수
  - 기존:
    export const increment = (index) => ({
      type: types.INCREMENT,
      index
    });
  - 적용:
    export const increment = createActions(types.INCREMENT);
  - 파라미터 명시하는 방법:
    export const setColor = createAction(types.SET_COlOR, ({index, color}) => ({index, color}));
  - 파라미터: increment(3)
      결과: {
        type: 'INCREMENT',
        payload: 3
      }
    여러 개일 때: increment({index: 5, color: 'red'});
      결과: {
        type: 'INCREMENT',
        payload: {
          index: 5,
          color: 'red'
        }
      }

* handleActions: 리듀서 간편 생성. 두번째 파라미터로 초기 상태(initialState)
    const reducer = handleActions({
      INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
      })
    }, {counter: 0})

/* 리덕스 미들웨어 */
: 액션을 디스패치했을 때, 리듀서에서 이를 처리하기 전에 사전에 지정된 작업들을 실행.
* 미들웨어 적용: store 생성 시 applyMiddleware로 적용
const store = createStore(modules, applyMiddleware(loggerMiddleware));

/* 비동기 작업 미들웨어 */
* redux-thunk
  - thunk: 특정 작업을 나중에 할 수 있도록 미루려고 함수 형태로 감싼 것.
  - 객체 뿐만 아니라, 함수도 디스패치할 수 있게 한다.
  - thunk 생성 함수: dispatch와 getState를 파라미터로 가지는 새로운 함수를 만들어 반환.
      export const incrementAysnc = () => dispatch => {  // 1초 뒤에 액션이 디스패치되는 코드
        setTimeout(
          () => { dispatch(increment()) },
          1000
        );
      }
        // 이렇게 하면, 나중에 store.dispatch(incrementAsync()) 했을 때(스토어에 액션을 디스패치할 때)
        // INCREMENT_COUNTER 액션을 1초 뒤에 디스패치한다.
        //(기존 CounterActions.increment를 CounterActions.incrementAsync로 수정)
      function incrementIfOdd() {  // 조건에 따라 액션을 디스패치하거나 무시하는 코드
        return (dispatch, getState) => {
          const { counter } = getState();  // 스토어 상태에도 접근할 수 있다.
          if (counter % 2 === 0) {
            return;
          }
          dispatch(increment());
        };
      }


</Fragment>