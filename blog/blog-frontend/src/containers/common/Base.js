/* 로그인 모달은 리스트 페이지든 포스트 페이지든 전역적으로 사용하는 모달이기 때문에 App에서 렌더링해야 한다.
  하지만 전역적으로 필요한 컴포넌트가 많아서 App 컴포넌트에 렌더링하는 컴포넌트가 늘어나면 App 컴포넌트의 render 함수가 복잡해진다.
  따라서 Base 컨테이너 컴포넌트를 만들어 그 안에 LoginModalContainer를 렌더링한다.
  Base를 컨테이너로 만드는 이유는 페이지를 새로고침할 때마다 현재 유저가 로그인 중인지 검증하는데, 이 작업을 Base 컴포넌트에서 처리할 것이기 때문이다. */

import React, { Component } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class Base extends Component {
  /* 로그인 상태에서 페이지를 새로고침하면 리덕스 상태가 초기화된다. 
    이를 해결하기 위해 서버에 로그인 상태를 요청.
    하지만 checkLogin API가 응답할 때까지는 클라이언트에서 로그아웃 상태로 간주하는 문제가 있다.
    따라서 유저가 로그인했다면 새로고침을 해도 checkLogin이 응답할 때까지는 임시적으로 로그인 상태를 유지해야 한다.
    => HTML5의 localStorage에 값을 넣으면, 페이지를 새로고침하거나 웹 브라우저를 닫았다 열어도 값을 유지한다.
    주의할 점은 값이 문자열 형태로 들어가므로 객체, 숫자, Boolean 등 값을 넣으면 JSON.stringify, JSON.parse를 사용하거나 문자열로 취급해야 한다.
    (이는 임시적으로 로그인 상태로 만든 것이므로, 서버 세션에서 로그인 상태가 아니라면 다시 로그인 상태가 비활성화된다.) */
  initialize = async () => {
    const { BaseActions } = this.props;
    if (localStorage.logged === 'true') {
      BaseActions.tempLogin();
    }
    BaseActions.checkLogin();
  }
  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <div>
        {/* 전역적으로 사용하는 컴포넌트들을 이 곳에서 렌더링한다. */}
        <LoginModalContainer/>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);