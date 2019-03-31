import React, { Component } from 'react';
import TodoInput from '../components/TodoInput';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as inputActions from '../modules/input';
import * as todosActions from '../modules/todos';

class TodoInputContainer extends Component {
  // 기존 App 컴포넌트에서 setState 하던 부분을 모두 리덕스의 액션 생성 함수를 호출하는 것으로 변경하였다. (? 흠)
  id = 1
  getId = () => {
    return ++this.id;
  }
  
  handleChange = (e) => {
    const { value } = e.target;
    const { InputActions } = this.props;
    InputActions.setInput(value);
  }
  handleInsert = () => {
    const { InputActions, TodosActions, value } = this.props;
    const todo = {
      id: this.getId(),
      text: value,
      done: false
    };
    TodosActions.insert(todo);
    InputActions.setInput('');
  }

  render() {
    const { value } = this.props;
    const { handleChange, handleInsert } = this;
    return (
      // 왜 <div>로 감싸지 않는가
      <TodoInput
        onChange={handleChange}
        onInsert={handleInsert}
        value={value}
      />
    );
  }
}

/* mapStateToProps와 mapDispatchToProps 함수에 대한 래퍼런스를 따로 만들지 않고,
  그 내부에 바로 정의해본다. */
export default connect(
  // mapStateToProps
  (state) => ({
    value: state.input.get('value')
  }),
  // mapDispatchToProps
  (dispatch) => ({
    /* 기존 dispatch 작업:
      {
        actionCreator: (...params) => dispatch(actionCreator(...params))
      }
      bindActionCreators는 자동으로 위의 작업을 처리해준다.
      일일이 dispatch할 필요가 없다.
    */
    InputActions: bindActionCreators(inputActions, dispatch),
    TodosActions: bindActionCreators(todosActions, dispatch)
    // 나중에 이를 호출할 때는 this.props.InputActions.setInput을 호출하면 된다.
  })
)(TodoInputContainer);