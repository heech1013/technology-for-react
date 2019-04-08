import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';

function getPostAPI (postId) {
  return axios.get(`https://isonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

// 모듈 내부에서 사용하므로 export로 내보낼 필요가 없다.
const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

export const getPost = (postId) => dispatch => {
  dispatch(getPostPending());
  return getPostAPI(postId).then((response) => {
    // 요청 성공 시 response를 payload로 설정하여 SUCCESS 액션을 디스패치한다.
    dispatch(getPostSuccess(response))
    return response;  // 나중에 getPostAPI.then을 했을 때 response에 접근할 수 있도록 한다.
  }).catch(error => {
    dispatch(getPostFailure(error));
    throw(error);  // 나중에 함수를 실행한 후 다시 한 번 catch를 할 수 있도록 한다.
  })
}

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
  }
  [GET_POST_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  }
}, initialState);