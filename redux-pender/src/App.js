import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

class App extends Component {

  /* 요청 취소
    redux-pende를 사용하면 Promise 기반 액션을 아주 쉽게 취소할 수 있다. Prmose 기반 액션을 디스패치하고 나면
    cancel 함수가 포함된 Prmose를 반환한다. 이 cancel 함수를 호출하면 미들웨어가 해당 요청을 더 이상 처리하지 않는다.
    Esc 버튼을 눌렀을 때 요청을 취소하도록 작성한다.
    요청 취소했을 때 특정 작업을 하고 싶다면 리듀서의 ...pender를 사용하는 부분에서 onCancel 함수를 추가하면 된다. */
  cancelRequest = null

  handleCancel = () => {
    if (this.cancelRequest) {
      this.cancelRequest();
      this.cancelRequest = null;
    }
  }

  loadData = async () => {
    const { PostActions, number } = this.props;
    try {
      const p = PostActions.getPost(number);
      this.cancelRequest = p.cancel;
      const response = await p;
      // const response = await PostActions.getPost(number);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.handleCancel();
      }
    })
  }
  componentDidUpdate() {
    if (this.props.number !== prevProps.number) {
      this.loadData();
    }
  }

  render() {
    const { CounterActions, number, post, error, loading } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        {
          loading
            ? (<h2>로딩중...</h2>)
            : (
              error
                ? (<h2>오류 발생!!</h2>)
                : (
                  <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </div>
                )
            )
            // (() => {
            //   if (loading) (<h2>로딩중...</h2>);
            //   if (error) (<h2>오류 발생!!</h2>)
            //   return (
            //     <div>
            //       <h2>{post.title}</h2>
            //       <p>{post.body}</p>
            //     </div>
            //   )
            // })()
        }
        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    number: state.counter,
    post: state.post.data,
    loading: state.post.pending,
    error: state.post.error
  }),
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);