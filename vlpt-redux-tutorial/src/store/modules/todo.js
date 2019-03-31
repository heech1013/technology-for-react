import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

/* createActon을 통하여 만든 액션생성함수에 파라미터를 넣어서 호출하면,
  자동으로 payload라는 이름으로 통일되어 설정된다.
  ex)
  changeInput('새로운 값');
  // { type: 'todo/CHANGE_INPUT, payload: '새로운 값}
  multi({ foo:1, bar:2 });
  // { type: 'MULTI', payload: { foo: 1, bar: 2} }
  
  어떤 파라미터를 받는지 명시하고 싶을 경우
  두번째 파라미터인 payloadCreator에 명시하면 된다.
*/
export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id  = 0;  // todo 아이템에 들어갈 고유 값

const initialState = Map({
  input: '',
  todos: List()
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
  // action을 비구조화 할당하고, payload값을 text로 부른다.
  [INSERT]: (state, { payload: text }) => {
    const item = Map({ id: id++, checkd: false, text });
    return state.update('todos', todos => todos.push(item));
  },
  [TOGGLE]: (state, { payload: id }) => {
    // id값을 가진 index를 찾는다.
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    // 해당 index를 찾아 checked 값을 반전시킨다.
    return state.updateIn(['todos', index, 'checked'], checked => !checked);
  },
  [REMOVE]: (state, { payload: id }) => {
    // id값을 가진 index를 찾아서 지운다.
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.deleteIn(['todos', index]);
  }
}, initialState);