import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';  // 마크다운 html이 변환되지 않으므로 특수문자가 그대로 보이는 문제점 해결(마크다운 사용 특수문자 제거)

const cx = classNames.bind(styles);

const PostItem = ({title, body, publisedDate, tags, id}) => {
  console.log('=================================tags',tags)
  const tagList = tags.map(
    tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
  );
  return (
    <div className={cx('post-item')}>
      <h2><Link to={`/post/${id}`}>{title}</Link></h2>
      <div className={cx('date')}>{moment(publisedDate).format('ll')}</div>
      <p>{removeMd(body)}</p>
      <div className={cx('tags')}>
        {tagList}
      </div>
    </div>
  )
}
const PostList = ({posts}) => {
  console.log('=====================post', posts)
  const postList = posts.map(
    (post) => {
      const { _id, title, body, publisedDate, tags } = post.toJS();
      console.log('===============_id', _id);
      console.log('===============title', title);
      console.log('===============tags', tags)
      return (
        <PostItem
          title={title}
          body={body}
          publisedDate={publisedDate}
          tags={tags}
          key={_id}
          id={_id}
        />
      )
    }
  );
  return (
    <div className={cx('post-list')}>
      {postList}
    </div>
  );
};

export default PostList;