import React, { Component } from 'react';
// import notify from './notify';  // 버튼을 클릭하기 전까지는 필요 없는 코드.
import withSplitting from './withSplitting';

const SplitMe = withSplitting(() => import('./SplitMe'));

class App extends Component {
  handleClick1 = () => {
    /* [함수를 코드 스플리팅 해보기]
      - import를 함수로 사용하면, Promise를 반환한다.
        import()는 모듈을 비동기적으로 CommonJS 형태로 불러오니, 따로 default를 명시해주어야 한다.
      - 버튼을 클릭 후 1.chunk.js 파일을 불러오는 것을 확인할 수 있다(크롬 Network 탭 확인).
        이렇게 분리된 파일을 청크 파일이라고 한다.
     */
    import('./notify').then(({ default: notify }) => {
      notify();
    });
  };

  state = {
    // SplitMe: null
    visible: false
  };
  handleClick2 = () => {
    /* [컴포넌트를 코드 스플리팅 해보기]
      - handleClick2가 호출되면, 비동기적으로 SplitMe를 불러와서 state에 담는다.
      - render 함수에서, state 안의 SplitMe가 유효할 때(null이 아닐 때)만 렌더링한다.
    */
    import('./SplitMe').then(({ default: SplitMe }) => {
      this.setState({
        SplitMe
      });
    });
  };
  handleClick3 = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    // const { SplitMe } = this.state;
    const { visible } = this.state;
    return (
      <div>
        {/* <button onClick={this.handleClick1}>Click me 1</button> */}
        {/* <button onClick={this.handleClick2}>Click me 2</button> */}
        {/* {SplitMe && <SplitMe />} */}
        <button onClick={this.handleClick3}>Click me 3</button>
        {visible && <SplitMe />}
      </div>
    );
  }
}

export default App;