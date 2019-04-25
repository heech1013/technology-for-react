/* 코드 스플리팅: 컴포넌트를 비동기적으로 불러올 수 있게 하는 asyncComponent 함수. 아직 구현 ㄴㄴ 할게.. */
import React from 'react';

export default function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {
    static Component = null;

    state = { Component: AsyncComponent.Component };

    constructor(props) {
      super(props);
      if (AsyncComponent.Component) return ;
      getComponent().then(({default: Component}) => {
        AsyncComponent.Component = Component;
        this.setState({Component});
      });
    }

    render() {
      const { Component } = this.state
      if (Component){
        return <Component {...this.props} />
      }
      return null
    }
  }

  // 서버사이트 렌더링 / 코드 스플리팅 충돌을 해결하는 함수
  AsyncComponent.getComponent().then(({default: Component}) => {
    AsyncComponent.Component = Component;
    this.setState({Component});
  });

  return AsyncComponent;
}