/* /about 주소로 들어왔을 때 보이는 라우트 */

import React from 'react';
import queryString from 'query-string'

const About = ({location, match}) => {
  /* query string
    - query-string 모듈을 설치해야 한다.
    - query 내용을 받아오려면, 라우트로 설정된 컴포넌트에서 받아 오는 props 중 하나인 location 객체의 search 값을 조회해야 한다.
    - query string으로 받아오는 값들은 모두 문자열이라는 것을 주의! 알맞은 형태로 변환시킨 후 사용해야 한다. */
  const query = queryString.parse(location.search);
  const { color } = query;

  return (
    <div>
      <h2 style={{color}}>소개</h2>
      <p>
        {/* 라우트에 params로 특정 값을 넣었을 때. params 객체는 props로 전달받는 match 객체 내부에 있다. */}
        안녕하세요, 저는 {match.params.name}입니다.
      </p>
    </div>
  );
};

export default About;