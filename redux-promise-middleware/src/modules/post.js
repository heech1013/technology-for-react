import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';

function getPostAPI (postId) {
  return axios.get(`https://isonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);

// 기존 thunk 함수에서는 요청 시작 시 PENDING, 성공 또는 실패 시 SUCCESS, FAILURE 액션을 디스패치해야 했지만
// redux-promise-middleware가 자동으로 이 작업을 해준다.
export const getPost = (postId) => ({
  type: GET_POST,
  payload: getPostAPI(postId)
});

const initialState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: ''
  }
}

export default handleActions({
  [GET_POST_PENDING]: (state, action) => {
    return {
      ...state,
      pending: true,
      error: false
    };
  },
  [GET_POST_SUCCESS]: (state, action) => {
    const { title, body } = action.payload.data;
    return {
      ...state,
      pending: fasle,
      data: {
        title,
        body
      }
    };
  },
  [GET_POST_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  }
}, initialState);