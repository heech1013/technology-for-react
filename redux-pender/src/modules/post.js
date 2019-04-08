import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

function getPostAPI (postId) {
  return axios.get(`https://isonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';

// 요청이 진행 중인지, 오류가 발생했는지 등의 여부는 더 이상 직접 관리할 필요가 없다. pendingReducer가 관리한다.
// const GET_POST_PENDING = 'GET_POST_PENDING';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = createAction(GET_POST, getPostAPI);

// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);

// 기존 thunk 함수에서는 요청 시작 시 PENDING, 성공 또는 실패 시 SUCCESS, FAILURE 액션을 디스패치해야 했지만
// redux-promise-middleware가 자동으로 이 작업을 해준다.
// export const getPost = (postId) => ({
//   type: GET_POST,
//   payload: getPostAPI(postId)
// });

const initialState = {
  // pending: false,
  // error: false,
  data: {
    title: '',
    body: ''
  }
}

// export default handleActions({
//   [GET_POST_PENDING]: (state, action) => {
//     return {
//       ...state,
//       pending: true,
//       error: false
//     };
//   },
//   [GET_POST_SUCCESS]: (state, action) => {
//     const { title, body } = action.payload.data;
//     return {
//       ...state,
//       pending: fasle,
//       data: {
//         title,
//         body
//       }
//     };
//   },
//   [GET_POST_FAILURE]: (state, action) => {
//     return {
//       ...state,
//       pending: false,
//       error: true
//     };
//   }
// }, initialState);

export default handleActions({
  ...pender({
    type: GET_POST,  // type이 주어지면 이 type에 접미사를 붙인 액션 핸들러들이 담긴 객체를 만든다.
    /* 요청 중일 때와 실패했을 때 추가로 해야 할 작업이 있다면
    이렇게 onPending과 onFailure를 추가하면 된다. 
    onPending: (state, action) => state,
    onFailure: (state, action) => state
    */
    onSuccess: (state, action) => {
      // 성공했을 때 따로 해야 할 작업이 없으면 역시나 생략 가능.
      const {title, body} = action.payload.data;
      return {
        data: {
          title,
          body
        }
      }
    },
    onCancel: (state, action) => {
      return {
        data: {
          title: '취소됨',
          body: '취소됨'
        }
      }
    }
    // 함수를 생략했을 때 기본값으로는 (state, action) => state를 설정한다(state를 그대로 반환).
  })
}, initialState);