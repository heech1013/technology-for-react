/* [HOC를 사용하여 더 쉽게 코드 스플리팅하기]
  - 코드 스플리팅할 때 반복되는 로직을 함수화해줌으로서, 나중에 코드 스플리팅된
    컴포넌트를 렌더링 하는 것만으로 코드를 불러와서 사용할 수 있게 해준다. */

import React, { Component } from 'react';

const withSplitting = getComponent => {
  // getComponent에, () => import('./SplitMe) 의 형태로 파라미터가 전달되어야 한다.
  class withSplitting extends Component {
    state = {
      Splitted: null
    };

    constructor(props) {
      super(props);
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return <Splitted {...this.props} />;
    }
  }

  return withSplitting;
};

export default withSplitting;