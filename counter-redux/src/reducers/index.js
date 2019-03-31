import * as types from '../actions/ActionTypes';

const initialState = {
  counters: [
    {
      color: 'black',
      number: 0
    }
  ]
};

function counter(state = initialState, action) {
  const { counters } = state;

  switch (action.type) {
    case types.CREATE:
      return {
        counters: [
          ...counters,
          {
            color: action.color,
            number: 0
          }
        ]
      };
    case types.REMOVE:
      return {
        counters: counters.slice(0, counters.length - 1)
      };
    /* 배열의 업데이트는 기존 배열에 push 또는 pop으로 값을 변경하면 안되고,
      전개 연산자(...)를 사용하거나 slice 함수로 배열을 잘라서 새로 생성해야 한다. */
    case types.INCREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number + 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    case types.DECREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number - 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    case types.SET_COLOR:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            color: action.color
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    default:
      return state;
  }
}

export default counter;