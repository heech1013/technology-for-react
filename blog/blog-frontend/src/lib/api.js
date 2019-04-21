import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, tags}) => axios.post('/api/posts', {title, body, tags});
export const getPost = (id) => axios.get(`/api/posts/${id}`);
// 구형 웹브라우저 호환을 위해 @5를 붙여 v5를 설치한다.
// 객체를 URL 쿼리 문자열로 변환할 때는 queryString.stringify 함수를 사용한다.
export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);