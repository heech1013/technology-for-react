/* 페이지 컴포넌트들을 불러와 파일 하나로 내보낼 수 있도록 인덱스 파일을 만든다. */

// 컴포넌트를 불러온 후 동일한 이름으로 내보낸다.
export { default as Home } from './Home';
export { default as About } from './About';
export { default as Post } from './Post';
export { default as Posts } from './Posts';