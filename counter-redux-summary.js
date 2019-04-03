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

</Fragment>