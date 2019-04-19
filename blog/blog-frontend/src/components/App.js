import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage, PostPage, EditorPage, NotFoundPage } from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        {/* Switch: 설정된 라우트 중에서 일치하는 라우트 하나만 보여 준다. 어떤 라우터에도 일치하지 않으면 NotFoundPage를 보여 주게 된다. */}
        <Route exact path="/" component={ListPage}/>
        <Route path="/page/:page" component={ListPage}/>
        <Route path="/tag/:tag/:page?" component={ListPage}/>
        <Route path="/post/:id" component={PostPage}/>
        <Route path="/editor" component={EditorPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;