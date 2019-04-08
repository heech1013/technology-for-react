/* App: 웹 브라우저의 주소에 따라 어떤 컴포넌트를 보여 줄지 정의 */

import React from 'react';
import { Route } from 'react-router-dom';
import {
  Home,
  About,
  Posts
} from 'pages';
import Menu from 'components/Menu';

const App = () => {
  return (
    <div>
      <Menu/>
      {/* exact: 주소가 설정한 path와 정확히 일치할 때만 보이도록 한다.
        exact를 제거할 시 /about 경로로 들어와도 / 경로의 내부이기 때문에 일치하는 것으로 간주된다. */}
      <Route exact path="/" component={Home}/>
      {/* 라우트의 경로에 특정 값을 넣는 방법 1: params */}
      <Route path="/about/:name?" component={About}/>
      {/* 중복 주소로 인해 컴포넌트가 겹칠 때
            해결방법 1: 기존 /about 경로에 exact 옵션을 붙인다.
            해결방법 2: params를 선택적으로 받을 수 있도록 끝에 ?를 붙인다.
              <Route path="/about/:name?" component={About}/>
          파라미터가 여러 개일때
            "/about/:name/:anotherValue"
       */}
       <Route path="/posts" component={Posts}/>
    </div>
  );
};

export default App;