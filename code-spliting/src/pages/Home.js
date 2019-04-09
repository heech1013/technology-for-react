/* 주소에 아무것도 지정하지 않았을 때 기본적으로 보여 줄 Home 라우트 */
/* 단순 링크 클릭이 아니라, js에서 페이지를 이동해야 하는 로직 작성 (예를 들면 로그인 후 특정 경로로의 이동 등)
  -> (자바스크립트로 라우팅) 라우트로 사용된 컴포넌트가 받아 오는 props 중 하나인 history 객체의 push 함수 활용 */

import React from 'react';

const Home = ({history}) => {
  return (
    <div>
      <h2>홈</h2>
      <button onClick={() => {
        history.push('/about/javascript')
      }}>자바스크립트를 사용하여 이동</button>
    </div>
  );
};

export default Home;