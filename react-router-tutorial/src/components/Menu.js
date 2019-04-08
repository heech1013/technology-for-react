/*
  - 다른 라우터로 이동할 때, a 태그 사용 시 페이지를 새로고침하면서 이동하기 때문에 Link 컴포넌트를 사용한다.
  - NavLink는 Link와 비슷하지만, 추가 기능이 있다: 현재 주소와 해당 컴포넌트 목적지 주소가 일치한다면 특정 스타일 또는 클래스를 지정할 수 있다.
*/

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
  const activeStyle = {
    color: 'green',
    fontSize: '2rem'
  };

  return (
    <div>
      <ul>
        {/* <li><Link to="/about/react">React 소개</Link></li> */}

        {/* - CSS 클래스를 적용하고 싶다면 activeClassName 값을 지정한다.
            - exact 옵션을 붙이지 않았을 경우, /about/react 페이지에 들어갈 때
              / 경로와 /about 경로 둘 다 일치하는 것으로 간주하여 모든 링크에 스타일을 적용한다. */}
        <li><NavLink exact to="/" activeStyle={activeStyle}>홈</NavLink></li>
        <li><NavLink exact to="/about" activeStyle={activeStyle}>소개</NavLink></li>
        <li><NavLink to="/about/react" activeStyle={activeStyle}>React 소개</NavLink></li>
        <li><NavLink to="/posts" activeStyle={activeStyle}>포스트 목록</NavLink></li>
      </ul>
    </div>
  );
};

export default Menu;