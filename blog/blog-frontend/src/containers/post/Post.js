import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo/PostInfo.js';
import PostBody from 'components/post/PostBody/PostBody.js';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import removeMd from 'remove-markdown';
import { Helmet } from 'react-helmet';

class Post extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { loading, post } = this.props;

    if (loading) return null;  // 로딩 중일 때는 아무것도 보여 주지 않음

    const { title, body, publisedDate, tags } = post.toJS();

    return (
      <div>
        {/* body 값이 있을 때만 helmet 설정. body가 null이면 오류가 발생하므로. */
          body && (
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={removeMd(body).slice(0, 200)}/>
            </Helmet>
          )
        }
        <PostInfo title={title} publisedDate={publisedDate} tags={tags}/>
        <PostBody body={body}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    post: state.post.get('post'),
    loading: state.pender.pending['post/GET_POST']  // 로딩 상태
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);