import { Map, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = List([
  Map({
    id: 0,
    text: 'studying react',
    done: true
  }),
  Map({
    id: 1,
    text: 'styling component',
    done: false
  })
]);

export default handleActions({
  [INSERT]: (state, action) => {
    const { id, text, done } = action.payload;
    return state.push(Map({
      id, text, done
    }));
  },
  [TOGGLE]: (state, action) => {
    const { payload: index } = action;
    /* const index = action.payload
      필수인 작업은 아니지만, payload가 어떤 값을 의미하는지 쉽게 이해할 수 있도록 넣었다고 한다. */
    return state.updateIn([index, 'done'], done => !done);
  },
  [REMOVE]: (state, action) => {
    const { payload: index } = action;
    return state.delete(index);
  }
}, initialState)