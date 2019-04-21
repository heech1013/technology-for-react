import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);

// initial state
const initialState = Map({
  posts: List(),
  lastPage: null
});

// reducer
export default handleActions({
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { data: posts } = action.payload;

      const lastPage = action.payload.headers['last-page'];  // axios에서는 소문자로 헤더를 읽어 온다.
      return state.set('posts', fromJS(posts))
        .set('lastPage', parseInt(lastPage, 10));  // 읽어온 헤더 값은 문자열 형태로 들어오므로 parseInt를 사용하여 숫자로 변환한다.
    }
  })
}, initialState)