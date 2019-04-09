import React from 'react';
import { Post } from 'pages';
import { Link, Route } from 'react-router-dom';

const Posts = ({match}) => {
  return (
    <div>
      <h3>포스트 목록</h3>
      <ul>
        {/* match.url은 현재 라우트에 설정된 경로를 알려준다. 이 컴포넌트가 "/posts"라는 라우트로 등록되면, 링크의 to값에 자동으로 '/posts'가 등록된다.
            장점은 나중에 Posts의 라우트 주소를 '/blog/posts'로 변경한다고 해도 자동으로 반영이 된다는 것이다. */}
        <li><Link to={`${match.url}/1`}>포스트 #1</Link></li>
        <li><Link to={`${match.url}/2`}>포스트 #2</Link></li>
        <li><Link to={`${match.url}/3`}>포스트 #3</Link></li>
      </ul>
      {/* 따로 컴포넌트를 만들어 등록하는 것이 아니라, 무엇을 보여줄 지 JSX를 직접 작성하는 경우에 render 라는 props를 설정한다.
          /posts와 정확히 일치할 때만 render에 있는 내용을 보여준다. */}
      <Route exact path={match.url} render={() => (<p>포스트를 선택하세요.</p>)}/>
      <Route exact path={`${match.url}/:id`} components={Post}/>
    </div>
  );
};

export default Posts;