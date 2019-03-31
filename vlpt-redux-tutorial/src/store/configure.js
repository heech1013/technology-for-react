/* 스토어를 생성하는 함수륾 만들어서 내보냄
  이 함수는 store/index.js 에서 불러와서 사용하게됨 */
/* 따로 모듈화를 하는 이유는, 하나의 애플리케이션에서는 하나의 스토어밖에 없긴 하지만 예외의 케이스가 있기 때문이다.
  나중에 서버사이드 렌더링을 하게 된다면, 서버쪽에서도 각 요청이 처리 될 때마다 스토어를 생성해주어야 하는데,
  그런 작업을 하게 될 때 이렇게 스토어를 생성하는 함수를 이렇게 모듈화 하곤 한다. */

import { createStore } from 'redux';
import modules from './modules';

const configure = () => {
  const store = createStore(modules, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}

export default configure;