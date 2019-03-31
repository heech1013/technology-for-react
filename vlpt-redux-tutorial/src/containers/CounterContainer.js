// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from 'store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    // this.props.increment();
    // bindActionCreators를 사용함에 따라 props 수정
    const { CounterActions } = this.props;
    CounterActions.increment();
  }
  handleDecrement = () => {
    // this.props.decrement();
    const { CounterActions } = this.props;
    CounterActions.decrement();
  }
  
  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;

    return (
      // 왜 div로 감싸지 않아도 되는지?
      <Counter
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

/* connect의 인자들을 밖으로 빼지 않는 경우(보통의 방법)
const mapStateToProps = (state) => ({
  number: state.counter.number
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(counterActions.increment()),
  decrement: () => dispatch(counterActions.decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
*/

/* 인자를 connect 안에 넣는 경우(더 깔끔해보일수도)
export default connect(
  (state) => ({
    number: state.counter.number
  }),
  (dispatch) => ({
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement())
  })
)(CounterContainer);
*/

// redux의 bindActionCreator를 사용하는 경우
export default connect(
  (state) => ({
    number: state.counter.number
  }),
  /* 기존:
    (dispatch) => bindActionCreators(counterActions, dispatch)
    추후 컨테이너 컴포넌트의 여러 모듈에서 액션 생성 함수를
    참조해야 하게 될 경우, 다음과 같이 bindActionCreators의 결과물을
    CounterActions라는 props로 넣어주면 된다.
    그리고 this.props.CounterActions.~로 액션 생성 함수를 불러온다.
  */
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);